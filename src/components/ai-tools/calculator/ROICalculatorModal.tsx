import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Calculator, TrendingUp, Clock, Target, Phone, Link, Download, Check } from "lucide-react";
import { formatZAR, formatPercentage } from "@/lib/formatters";
import { toast } from "sonner";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ROICalculatorModalProps {
  trigger?: React.ReactNode;
  initialValues?: {
    revenue?: number;
    investment?: number;
    growth?: number;
    timeframe?: number;
  };
  autoOpen?: boolean;
  onAutoOpenComplete?: () => void;
}

interface ProjectionData {
  month: number;
  revenue: number;
  investment: number;
  profit: number;
}

export function ROICalculatorModal({ trigger, initialValues, autoOpen, onAutoOpenComplete }: ROICalculatorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Handle auto-open from URL params
  useEffect(() => {
    if (autoOpen && !isOpen) {
      setIsOpen(true);
      onAutoOpenComplete?.();
    }
  }, [autoOpen, isOpen, onAutoOpenComplete]);

  // Input states with initial values support
  const [currentRevenue, setCurrentRevenue] = useState(initialValues?.revenue || 100000);
  const [investmentAmount, setInvestmentAmount] = useState(initialValues?.investment || 20000);
  const [expectedGrowth, setExpectedGrowth] = useState(initialValues?.growth || 15);
  const [timeframe, setTimeframe] = useState(initialValues?.timeframe || 6);

  // Calculate projections
  const calculations = useMemo(() => {
    const monthlyGrowthRate = expectedGrowth / 100;
    const projections: ProjectionData[] = [];
    
    let cumulativeRevenue = 0;
    const cumulativeInvestment = investmentAmount;
    
    for (let month = 1; month <= timeframe; month++) {
      const projectedRevenue = currentRevenue * Math.pow(1 + monthlyGrowthRate, month);
      const revenueGain = projectedRevenue - currentRevenue;
      cumulativeRevenue += revenueGain;
      
      projections.push({
        month,
        revenue: Math.round(projectedRevenue),
        investment: cumulativeInvestment,
        profit: Math.round(cumulativeRevenue - cumulativeInvestment),
      });
    }

    const totalRevenueGain = cumulativeRevenue;
    const roi = ((totalRevenueGain - investmentAmount) / investmentAmount) * 100;
    const breakEvenMonth = projections.findIndex(p => p.profit >= 0) + 1;
    const finalRevenue = projections[projections.length - 1]?.revenue || currentRevenue;

    return {
      projections,
      totalRevenueGain: Math.round(totalRevenueGain),
      roi: Math.round(roi),
      breakEvenMonth: breakEvenMonth > 0 ? breakEvenMonth : null,
      finalRevenue: Math.round(finalRevenue),
      revenueIncrease: Math.round(finalRevenue - currentRevenue),
    };
  }, [currentRevenue, investmentAmount, expectedGrowth, timeframe]);

  // Generate shareable link
  const generateShareLink = useCallback(() => {
    const params = new URLSearchParams({
      roi: "1",
      r: String(currentRevenue),
      i: String(investmentAmount),
      g: String(expectedGrowth),
      t: String(timeframe),
    });
    return `${window.location.origin}/?${params.toString()}`;
  }, [currentRevenue, investmentAmount, expectedGrowth, timeframe]);

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(generateShareLink());
      setLinkCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  // Export as PDF
  const handleExportPDF = async () => {
    if (!resultsRef.current) return;
    
    setIsExporting(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      // Capture the results section
      const canvas = await html2canvas(resultsRef.current, {
        backgroundColor: "#0d0f14",
        scale: 2,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Add header
      pdf.setFillColor(13, 15, 20);
      pdf.rect(0, 0, 210, 297, "F");
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.text("ROI Calculation Report", 20, 25);
      
      pdf.setFontSize(12);
      pdf.setTextColor(150, 150, 150);
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 35);
      pdf.text("AN3S Growth Tools", 20, 42);

      // Add inputs section
      pdf.setFontSize(14);
      pdf.setTextColor(0, 255, 255);
      pdf.text("Inputs", 20, 58);
      
      pdf.setFontSize(11);
      pdf.setTextColor(255, 255, 255);
      pdf.text(`Current Monthly Revenue: ${formatZAR(currentRevenue)}`, 20, 68);
      pdf.text(`Growth Investment: ${formatZAR(investmentAmount)}`, 20, 76);
      pdf.text(`Expected Monthly Growth: ${formatPercentage(expectedGrowth)}`, 20, 84);
      pdf.text(`Timeframe: ${timeframe} months`, 20, 92);

      // Add results section
      pdf.setFontSize(14);
      pdf.setTextColor(0, 255, 255);
      pdf.text("Results", 20, 108);
      
      pdf.setFontSize(11);
      pdf.setTextColor(255, 255, 255);
      pdf.text(`Projected ROI: ${calculations.roi >= 0 ? "+" : ""}${formatPercentage(calculations.roi)}`, 20, 118);
      pdf.text(`Final Monthly Revenue: ${formatZAR(calculations.finalRevenue)}`, 20, 126);
      pdf.text(`Revenue Increase: +${formatZAR(calculations.revenueIncrease)}`, 20, 134);
      pdf.text(`Break-even: ${calculations.breakEvenMonth ? `Month ${calculations.breakEvenMonth}` : `>${timeframe} months`}`, 20, 142);

      // Add chart image
      const imgWidth = 170;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 20, 155, imgWidth, Math.min(imgHeight, 100));

      // Add footer
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text("*Projections are estimates based on compound growth. Actual results may vary.", 20, 280);
      pdf.text("Book a growth call: wa.me/27729749703 | an3s.info", 20, 287);

      pdf.save(`ROI-Report-${new Date().toISOString().split("T")[0]}.pdf`);
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant="outline"
            className="gap-2 border-primary/50 text-primary hover:bg-primary/10 hover:border-primary"
          >
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between text-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Calculator className="w-4 h-4 text-primary" />
              </div>
              ROI Calculator
            </div>
            {/* Share/Export buttons */}
            <div className="flex items-center gap-1">
              <UITooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopyLink}
                    className="h-8 w-8 text-muted-foreground hover:text-primary"
                    aria-label="Copy shareable link"
                  >
                    {linkCopied ? <Check className="w-4 h-4 text-primary" /> : <Link className="w-4 h-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy shareable link</p>
                </TooltipContent>
              </UITooltip>
              <UITooltip>
                <TooltipTrigger asChild>
                  <span tabIndex={isExporting ? 0 : -1}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleExportPDF}
                      disabled={isExporting}
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      aria-label="Export as PDF"
                    >
                      <Download className={`w-4 h-4 ${isExporting ? "animate-spin" : ""}`} />
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Export as PDF</p>
                </TooltipContent>
              </UITooltip>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Sliders Section */}
          <div className="space-y-5">
            {/* Current Monthly Revenue */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">
                  Current Monthly Revenue
                </label>
                <span className="text-sm font-semibold text-primary">
                  {formatZAR(currentRevenue)}
                </span>
              </div>
              <Slider
                value={[currentRevenue]}
                onValueChange={(v) => setCurrentRevenue(v[0])}
                min={10000}
                max={1000000}
                step={10000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>R10k</span>
                <span>R1M</span>
              </div>
            </div>

            {/* Investment Amount */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">
                  Growth Investment
                </label>
                <span className="text-sm font-semibold text-secondary">
                  {formatZAR(investmentAmount)}
                </span>
              </div>
              <Slider
                value={[investmentAmount]}
                onValueChange={(v) => setInvestmentAmount(v[0])}
                min={5000}
                max={200000}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>R5k</span>
                <span>R200k</span>
              </div>
            </div>

            {/* Expected Growth Rate */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">
                  Expected Monthly Growth
                </label>
                <span className="text-sm font-semibold text-primary">
                  {formatPercentage(expectedGrowth)}
                </span>
              </div>
              <Slider
                value={[expectedGrowth]}
                onValueChange={(v) => setExpectedGrowth(v[0])}
                min={5}
                max={50}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5%</span>
                <span>50%</span>
              </div>
            </div>

            {/* Timeframe */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">
                  Timeframe
                </label>
                <span className="text-sm font-semibold text-foreground">
                  {timeframe} months
                </span>
              </div>
              <Slider
                value={[timeframe]}
                onValueChange={(v) => setTimeframe(v[0])}
                min={3}
                max={24}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>3 months</span>
                <span>24 months</span>
              </div>
            </div>
          </div>

          {/* Results Section (ref for PDF export) */}
          <div ref={resultsRef} className="space-y-4">
            {/* Results Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs">Projected ROI</span>
                </div>
                <p className={`text-2xl font-bold ${calculations.roi >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  {calculations.roi >= 0 ? '+' : ''}{formatPercentage(calculations.roi)}
                </p>
              </div>

              <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Target className="w-4 h-4" />
                  <span className="text-xs">Revenue After {timeframe}mo</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {formatZAR(calculations.finalRevenue)}
                </p>
              </div>

              <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs">Break-even</span>
                </div>
                <p className="text-2xl font-bold text-secondary">
                  {calculations.breakEvenMonth 
                    ? `Month ${calculations.breakEvenMonth}` 
                    : `>${timeframe}mo`}
                </p>
              </div>

              <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs">Revenue Increase</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  +{formatZAR(calculations.revenueIncrease)}
                </p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-muted/20 border border-border/50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-foreground mb-4">
                Revenue Projection
              </h4>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={calculations.projections}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(186, 100%, 53%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(186, 100%, 53%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(v) => `M${v}`}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickFormatter={(v) => `R${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value: number) => [formatZAR(value), 'Revenue']}
                      labelFormatter={(label) => `Month ${label}`}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="hsl(186, 100%, 53%)"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-secondary/10 border border-secondary/30 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Want help achieving these growth targets?
            </p>
            <Button
              asChild
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
            >
              <a
                href="https://wa.me/27729749703"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Book a Growth Call
              </a>
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center">
            *Projections are estimates based on compound growth. Actual results may vary.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
