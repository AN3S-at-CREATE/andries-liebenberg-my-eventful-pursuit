import { useEffect, useState } from "react";
import { getBackgroundFXStatus } from "@/lib/backgroundStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Palette, Sparkles } from "lucide-react";

const Status = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [tokens, setTokens] = useState({ primary: "", secondary: "" });
  const [motionEnabled, setMotionEnabled] = useState(true);

  useEffect(() => {
    // Check BackgroundFX status
    setIsMounted(getBackgroundFXStatus().isMounted);

    // Check motion preference
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      setMotionEnabled(!prefersReducedMotion);
    }

    // Read computed CSS variables
    const styles = getComputedStyle(document.documentElement);
    setTokens({
      primary: styles.getPropertyValue("--primary").trim(),
      secondary: styles.getPropertyValue("--secondary").trim(),
    });
  }, []);

  const StatusIndicator = ({ status }: { status: boolean }) =>
    status ? (
      <CheckCircle className="h-5 w-5 text-primary" />
    ) : (
      <XCircle className="h-5 w-5 text-destructive" />
    );

  return (
    <div className="min-h-screen p-8">
      <div className="container max-w-2xl mx-auto">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-8">
          Visual System Status
        </h1>

        <div className="space-y-6">
          {/* System Status */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg">System Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-foreground">BackgroundFX mounted</span>
                <div className="flex items-center gap-2">
                  <StatusIndicator status={isMounted} />
                  <span className="text-sm text-muted-foreground">
                    {isMounted ? "true" : "false"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-foreground">Motion enabled</span>
                <div className="flex items-center gap-2">
                  <StatusIndicator status={motionEnabled} />
                  <span className="text-sm text-muted-foreground">
                    {motionEnabled ? "true" : "false"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-foreground">Neon streak overlays</span>
                <div className="flex items-center gap-2">
                  <StatusIndicator status={isMounted} />
                  <span className="text-sm text-muted-foreground">
                    {isMounted ? "active" : "inactive"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Design Tokens */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Design Tokens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground">Primary (Neon Cyan)</span>
                  <code className="text-sm text-primary font-mono">
                    {tokens.primary || "loading..."}
                  </code>
                </div>
                <div
                  className="h-8 rounded-md border border-border/50"
                  style={{
                    backgroundColor: tokens.primary
                      ? `hsl(${tokens.primary})`
                      : "transparent",
                    boxShadow: `0 0 20px hsl(${tokens.primary} / 0.5)`,
                  }}
                />
              </div>

              <div className="p-3 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground">Secondary (Cyber Pink)</span>
                  <code className="text-sm text-secondary font-mono">
                    {tokens.secondary || "loading..."}
                  </code>
                </div>
                <div
                  className="h-8 rounded-md border border-border/50"
                  style={{
                    backgroundColor: tokens.secondary
                      ? `hsl(${tokens.secondary})`
                      : "transparent",
                    boxShadow: `0 0 20px hsl(${tokens.secondary} / 0.5)`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Visual Test */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg">Glow Effects Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-card/50 border border-primary/30 animate-border-glow text-center">
                  <span className="text-sm text-primary">Cyan Glow</span>
                </div>
                <div className="p-4 rounded-lg bg-card/50 border border-secondary/30 animate-border-glow-pink text-center">
                  <span className="text-sm text-secondary">Pink Glow</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Glass Utilities Test */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Glass & Badge Utilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="glass p-4 rounded-lg text-center">
                  <span className="text-sm text-muted-foreground">.glass</span>
                </div>
                <div className="glass-cyan p-4 rounded-lg text-center">
                  <span className="text-sm text-primary">.glass-cyan</span>
                </div>
                <div className="glass-pink p-4 rounded-lg text-center">
                  <span className="text-sm text-secondary">.glass-pink</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 pt-2">
                <Badge variant="glow-cyan">glow-cyan</Badge>
                <Badge variant="glow-pink">glow-pink</Badge>
                <Badge variant="default">default</Badge>
                <Badge variant="secondary">secondary</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Status;
