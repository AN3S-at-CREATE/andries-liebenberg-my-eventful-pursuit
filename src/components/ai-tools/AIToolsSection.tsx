import { MessageSquareText } from "lucide-react";
import { AIToolCard } from "./AIToolCard";
import { ConciergeModal } from "./concierge/ConciergeModal";
import { Button } from "@/components/ui/button";
export function AIToolsSection(){return <section className="py-16 px-4"><div className="container max-w-5xl"><h2 className="font-heading text-3xl font-bold text-foreground mb-4">AI-Powered Growth Tools</h2><p className="text-lg text-muted-foreground mb-8">Leverage AI to diagnose, plan, and calculate your growth potential with tools built from real experience.</p><div className="max-w-md"><AIToolCard icon={MessageSquareText} title="Ask AN3S Concierge" description="Chat with AI about my experience, methodologies, and how I can help grow your business." status="available" accentColor="secondary"><ConciergeModal trigger={<Button variant="glow-secondary" size="sm" className="w-full"><MessageSquareText className="h-4 w-4"/>Start Chat</Button>}/></AIToolCard></div></div></section>;}
