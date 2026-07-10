import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleRetry = () => {
    // Force a chunk reload in case the lazy chunk failed to load
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="flex flex-col items-center justify-center p-6 bg-card/80 backdrop-blur-md border border-destructive/20 rounded-lg shadow-lg">
          <AlertCircle className="w-8 h-8 text-destructive mb-4" />
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">Something went wrong</h2>
          <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
            We encountered an error loading this component. Please try again.
          </p>
          <Button variant="outline" onClick={this.handleRetry} className="gap-2 border-primary/50 hover:bg-primary/10 hover:text-primary">
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
