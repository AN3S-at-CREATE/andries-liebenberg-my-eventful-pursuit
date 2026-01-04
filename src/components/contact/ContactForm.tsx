import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, CheckCircle } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  industry: string;
  goal: string;
  message: string;
  popiaConsent: boolean;
}

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    industry: "",
    goal: "",
    message: "",
    popiaConsent: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.popiaConsent) {
      toast({
        variant: "destructive",
        title: "Consent Required",
        description: "Please accept the POPIA consent to proceed.",
      });
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name,
          email: formData.email,
          company: formData.company || undefined,
          industry: formData.industry || undefined,
          goal: formData.goal || undefined,
          message: formData.message,
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send message. Please try again or contact via WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardContent className="pt-8 pb-8 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
            Message Sent Successfully!
          </h3>
          <p className="text-muted-foreground mb-6">
            I'll get back to you within 24-48 hours. Check your email for a confirmation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  company: "",
                  industry: "",
                  goal: "",
                  message: "",
                  popiaConsent: false,
                });
              }}
            >
              Send Another Message
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="https://wa.me/27729749703" target="_blank" rel="noopener noreferrer">
                WhatsApp for Urgent Matters
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="font-heading text-2xl text-foreground">Get in Touch</CardTitle>
        <CardDescription className="text-muted-foreground">
          Fill out the form below and I'll respond within 24-48 hours.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Name <span className="text-secondary">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-muted/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email <span className="text-secondary">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-muted/50 border-border/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-foreground">
                Company
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Your company name"
                value={formData.company}
                onChange={handleChange}
                className="bg-muted/50 border-border/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-foreground">
                Industry
              </Label>
              <Input
                id="industry"
                name="industry"
                placeholder="e.g., Events, Retail, Tech"
                value={formData.industry}
                onChange={handleChange}
                className="bg-muted/50 border-border/50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal" className="text-foreground">
              What are you looking to achieve?
            </Label>
            <Input
              id="goal"
              name="goal"
              placeholder="e.g., Grow my business, Build a new product"
              value={formData.goal}
              onChange={handleChange}
              className="bg-muted/50 border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-foreground">
              Message <span className="text-secondary">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project or what you'd like to discuss..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="bg-muted/50 border-border/50 resize-none"
            />
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id="popiaConsent"
              checked={formData.popiaConsent}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, popiaConsent: checked === true }))
              }
              className="mt-0.5"
            />
            <Label htmlFor="popiaConsent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I consent to AN3S collecting and processing my personal information in accordance with the{" "}
              <span className="text-primary">Protection of Personal Information Act (POPIA)</span>. 
              My data will only be used to respond to this inquiry and will not be shared with third parties.
            </Label>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
