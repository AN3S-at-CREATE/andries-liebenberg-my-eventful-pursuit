import { MessageSquareText } from "lucide-react";
import { AIToolCard } from "./AIToolCard";
import { ConciergeModal } from "./concierge/ConciergeModal";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/section";
export function AIToolsSection(){return <Section className="text-center" title="AI-Powered Growth Tools" lead="Leverage AI to diagnose, plan, and calculate your growth potential with tools built from real experience."><div className="max-w-md mx-auto text-left"><AIToolCard icon={MessageSquareText} title="Ask AN3S Concierge" description="Chat with AI about my experience, methodologies, and how I can help grow your business." status="available" accentColor="secondary"><ConciergeModal trigger={<Button variant="glow-secondary" size="sm" className="w-full"><MessageSquareText className="h-4 w-4"/>Start Chat</Button>}/></AIToolCard></div></Section>;}
