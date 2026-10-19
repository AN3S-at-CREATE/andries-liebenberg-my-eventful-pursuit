import { facts, whatsappUrl, serviceOffers } from "@/data/facts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, submitContactEnquiry } from "@/lib/contact-enquiry";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, CheckCircle } from "lucide-react";
import type { z } from "zod";

type ContactFormData = Omit<z.input<typeof contactSchema>, "popiaConsent"> & { popiaConsent: boolean };
const initialValues: ContactFormData = {
  name: "", email: "", service: "", company: "", industry: "", goal: "", message: "", popiaConsent: false,
};

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, control, handleSubmit, watch, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: initialValues,
  });
  const message = watch("message");

  const handleEnquirySubmit = async (formData: ContactFormData) => {
    setIsSubmitting(true);

    try {
      await submitContactEnquiry(contactSchema.parse(formData));

      setIsSubmitted(true);
      toast({
        title: "Message sent.",
        description: facts.responsePromise.value,
      });
    } catch {
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
      <Card variant="glass" className="border-pink/20">
        <CardContent className="pt-8 pb-8 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
            Message sent
          </h3>
          <p className="text-muted-foreground mb-6">
            {facts.responsePromise.value}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                reset(initialValues);
              }}
            >
              Send another message
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                WhatsApp for Urgent Matters
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="glass" className="border-pink/20">
      <CardHeader>
        <CardTitle className="font-heading text-2xl text-foreground">Send an enquiry</CardTitle>
        <CardDescription className="text-muted-foreground">
          {facts.responsePromise.value}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleEnquirySubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="service">Chosen service <span className="text-secondary">*</span></Label>
            <Controller name="service" control={control} render={({ field }) => (
              <Select name="service" value={field.value} onValueChange={field.onChange} required disabled={isSubmitting}>
                <SelectTrigger id="service" aria-invalid={!!errors.service} className="bg-muted/50 border-input"><SelectValue placeholder="Choose a service" /></SelectTrigger>
                <SelectContent className="max-w-[calc(100vw-2rem)]">
                  {[...new Set(serviceOffers.map((offer) => offer.discipline))].map((discipline) => (
                    <SelectGroup key={discipline}>
                      <SelectLabel className="whitespace-normal">{discipline}</SelectLabel>
                      {serviceOffers.filter((offer) => offer.discipline === discipline).map((offer) => (
                        <SelectItem key={offer.title} value={offer.title} className="whitespace-normal">{offer.title}</SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            )} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Name <span className="text-secondary">*</span>
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Your name"
                required
                maxLength={100}
                className="bg-muted/50 border-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email <span className="text-secondary">*</span>
              </Label>
              <Input
                id="email"
                {...register("email")}
                type="email"
                placeholder="Your email address"
                required
                maxLength={100}
                className="bg-muted/50 border-input"
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
                {...register("company")}
                placeholder="Your company name"
                maxLength={100}
                className="bg-muted/50 border-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-foreground">
                Industry
              </Label>
              <Input
                id="industry"
                {...register("industry")}
                placeholder="e.g., Events, Retail, Tech"
                maxLength={100}
                className="bg-muted/50 border-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal" className="text-foreground">
              What are you looking to achieve?
            </Label>
            <Input
              id="goal"
              {...register("goal")}
              placeholder="e.g., Grow my business, Build a new product"
              maxLength={200}
              className="bg-muted/50 border-input"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <Label htmlFor="message" className="text-foreground">
                Message <span className="text-secondary">*</span>
              </Label>
              <span
                id="message-character-count"
                className="text-xs text-muted-foreground"
                aria-live="polite"
              >
                {message.length} / 2000
              </span>
            </div>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Tell me about your project or what you'd like to discuss..."
              required
              maxLength={2000}
              rows={4}
              aria-describedby="message-character-count"
              className="bg-muted/50 border-input resize-none"
            />
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Controller name="popiaConsent" control={control} render={({ field }) => (
              <Checkbox id="popiaConsent" checked={field.value} onCheckedChange={(checked) => field.onChange(checked === true)} className="mt-0.5" aria-invalid={!!errors.popiaConsent} />
            )} />
            <Label htmlFor="popiaConsent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I consent to AN3S collecting and processing my personal information, including technical data (IP address, browser type) for security and fraud prevention, in accordance with the{" "}
              <span className="text-primary">Protection of Personal Information Act (POPIA)</span>. 
              My data will only be used to respond to this inquiry and for security purposes, and will not be shared with third parties.
            </Label>
          </div>

          {Object.values(errors).length > 0 && (
            <div role="alert" className="text-sm text-destructive">
              {Object.values(errors).map((error, index) => <p key={index}>{error.message}</p>)}
            </div>
          )}
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
                Send message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
