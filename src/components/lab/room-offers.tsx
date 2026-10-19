import { Link } from "react-router-dom";
import { getOffer } from "@/lib/labOffers";
import { whatsappLink } from "@/data/facts";
import { labWhatsappEnquiry } from "@/lib/lab-room";
import type { LabStar } from "@/data/lab";
import { Button } from "@/components/ui/button";

export function RoomOffers({ star }: { star: LabStar }) {
  return <><ul className="space-y-5">{star.offers.map(title => {
    const offer = getOffer(title);
    if (!offer) return null;
    return <li key={title}><p className="font-medium text-sm">{title}</p><p className="text-cyan-glow text-sm mt-1">{offer.price}</p>{offer.vat && <p className="text-caption text-ink-muted">{offer.vat}</p>}</li>;
  })}</ul><div className="grid gap-3 mt-6"><Button asChild><a href={whatsappLink(labWhatsappEnquiry(star))} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a></Button><Button asChild variant="outline"><Link to="/services">See prices</Link></Button></div></>;
}
