import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { companies } from "@/data/companies";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Copy, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Audience = "investor" | "client" | "partner";

const SESSION_KEY = "performance_brief_count";
const MAX_BRIEFS_PER_SESSION = 5;

export const PerformanceBriefModal = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [audience, setAudience] = useState<Audience>("investor");
  const [brief, setBrief] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const getBriefCount = (): number => {
    const count = sessionStorage.getItem(SESSION_KEY);
    return count ? parseInt(count, 10) : 0;
  };

  const incrementBriefCount = () => {
    const count = getBriefCount();
    sessionStorage.setItem(SESSION_KEY, String(count + 1));
  };

  const handleGenerate = async () => {
    if (!selectedCompany) {
      toast({
        title: "Select a company",
        description: "Please select a company to generate a brief for.",
        variant: "destructive",
      });
      return;
    }

    const count = getBriefCount();
    if (count >= MAX_BRIEFS_PER_SESSION) {
      toast({
        title: "Rate limit reached",
        description: "You've reached the maximum of 5 briefs per session. Please refresh to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setBrief("");

    try {
      const { data, error } = await supabase.functions.invoke("performance-brief", {
        body: { companyId: selectedCompany, audience },
      });

      if (error) throw error;

      setBrief(data.brief);
      incrementBriefCount();
    } catch (error) {
      console.error("Error generating brief:", error);
      toast({
        title: "Error",
        description: "Failed to generate brief. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(brief);
    toast({
      title: "Copied!",
      description: "Brief copied to clipboard.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Performance Brief
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">AI Performance Brief Generator</DialogTitle>
          <DialogDescription>
            Generate a tailored executive brief based on real company metrics.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Select Company</Label>
            <Select value={selectedCompany} onValueChange={setSelectedCompany}>
              <SelectTrigger className="bg-muted/50 border-border/50">
                <SelectValue placeholder="Choose a company..." />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Target Audience</Label>
            <RadioGroup
              value={audience}
              onValueChange={(v) => setAudience(v as Audience)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="investor" id="investor" />
                <Label htmlFor="investor" className="cursor-pointer">Investor</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="client" />
                <Label htmlFor="client" className="cursor-pointer">Client</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partner" id="partner" />
                <Label htmlFor="partner" className="cursor-pointer">Partner</Label>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoading || !selectedCompany}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Brief"
            )}
          </Button>

          {brief && (
            <div className="relative mt-4 p-4 bg-muted/30 rounded-lg border border-border/50">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={handleCopy}
                    aria-label="Copy performance brief"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy brief</p>
                </TooltipContent>
              </Tooltip>
              <div className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap text-foreground">
                {brief}
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            {MAX_BRIEFS_PER_SESSION - getBriefCount()} briefs remaining this session
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
