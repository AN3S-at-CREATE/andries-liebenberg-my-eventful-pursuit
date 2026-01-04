import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { MotionReveal } from "@/components/motion/MotionReveal";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container max-w-4xl mx-auto">
          <MotionReveal>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-8">
              Privacy Policy
            </h1>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground text-lg mb-6">
                Last updated: January 2025
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, such as when you fill out a contact form, 
                request information, or communicate with us. This may include your name, email address, 
                phone number, and any other information you choose to provide.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to respond to your inquiries, provide services you request, 
                send you marketing communications (with your consent), and improve our services.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">3. POPIA Compliance</h2>
              <p className="text-muted-foreground mb-4">
                We comply with the Protection of Personal Information Act (POPIA) of South Africa. 
                You have the right to access, correct, or delete your personal information at any time.
              </p>

              <h2 className="font-heading text-2xl font-bold text-foreground mt-8 mb-4">4. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For any privacy-related questions, contact us at create@an3s.info or +27 72 974 9703.
              </p>
            </div>
          </MotionReveal>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Privacy;
