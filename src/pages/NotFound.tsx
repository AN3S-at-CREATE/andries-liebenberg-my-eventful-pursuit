import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
export default function NotFound(){return <main className="min-h-screen bg-background flex items-center justify-center px-4"><Helmet><title>Page not found | AN3S</title><meta name="robots" content="noindex"/></Helmet><div className="text-center"><h1 className="text-4xl font-bold text-foreground mb-4">Page not found</h1><p className="text-body text-muted-foreground mb-8">This address does not match a page.</p><Button asChild><Link to="/">Return home</Link></Button></div></main>;}
