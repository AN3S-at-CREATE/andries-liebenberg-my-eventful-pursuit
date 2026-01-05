import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { checkRateLimit, getClientIP, rateLimitResponse } from "../_shared/rateLimit.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limit: 3 submissions per hour per IP
const RATE_LIMIT_CONFIG = { maxRequests: 3, windowMs: 60 * 60 * 1000 };

interface ContactRequest {
  name: string;
  email: string;
  company?: string;
  industry?: string;
  goal?: string;
  message: string;
}

const sendEmail = async (to: string[], subject: string, html: string, from: string) => {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from, to, subject, html }),
  });
  
  if (!res.ok) {
    const error = await res.text();
    console.error("[send-contact-email] Email provider error:", error);
    throw new Error("EMAIL_SEND_FAILED");
  }
  
  return res.json();
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  const rateLimitKey = `contact-email:${clientIP}`;
  const rateLimit = checkRateLimit(rateLimitKey, RATE_LIMIT_CONFIG);

  if (!rateLimit.allowed) {
    console.log(`[send-contact-email] Rate limit exceeded for IP: ${clientIP}`);
    return rateLimitResponse(rateLimit.resetAt);
  }

  try {
    const { name, email, company, industry, goal, message }: ContactRequest = await req.json();

    console.log("[send-contact-email] Processing submission:", { 
      name, 
      hasEmail: !!email, 
      company, 
      industry, 
      goal,
      ip: clientIP,
      remaining: rateLimit.remaining
    });

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Name, email, and message are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Email to AN3S
    const notificationHtml = `
      <h2>New Contact Form Submission</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
          <td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        ${company ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${company}</td>
        </tr>
        ` : ""}
        ${industry ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Industry</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${industry}</td>
        </tr>
        ` : ""}
        ${goal ? `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Goal</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${goal}</td>
        </tr>
        ` : ""}
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
        </tr>
      </table>
      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        Submitted at: ${new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg" })}
      </p>
    `;

    await sendEmail(
      ["book@hello.an3s.info"],
      `New Contact: ${name}${company ? ` from ${company}` : ""}`,
      notificationHtml,
      "AN3S Contact Form <email@hello.an3s.info>"
    );

    console.log("[send-contact-email] Notification sent");

    // Confirmation email to user
    const confirmationHtml = `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00d4ff;">Thank you, ${name}!</h1>
        <p>I've received your message and will get back to you within 24-48 hours.</p>
        ${goal ? `<p>I see you're interested in: <strong>${goal}</strong>. I'm excited to discuss how I can help.</p>` : ""}
        <p>In the meantime, feel free to:</p>
        <ul>
          <li><a href="https://wa.me/27729749703" style="color: #00d4ff;">WhatsApp me directly</a> for urgent matters</li>
          <li><a href="https://profile.an3s.info" style="color: #00d4ff;">View my portfolio</a></li>
        </ul>
        <p>Looking forward to connecting!</p>
        <p style="margin-top: 30px;">
          <strong>Andries Liebenberg</strong><br/>
          AN3S<br/>
          <a href="mailto:book@hello.an3s.info" style="color: #00d4ff;">book@hello.an3s.info</a><br/>
          <a href="tel:+27729749703" style="color: #00d4ff;">+27 72 974 9703</a>
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;" />
        <p style="font-size: 12px; color: #666;">
          This email was sent because you submitted a contact form on an3s.info. 
          Your personal information is handled in accordance with the Protection of Personal Information Act (POPIA).
        </p>
      </div>
    `;

    await sendEmail(
      [email],
      "Thanks for reaching out to AN3S",
      confirmationHtml,
      "AN3S <email@hello.an3s.info>"
    );

    console.log("[send-contact-email] Confirmation sent, success");

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("[send-contact-email] Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
