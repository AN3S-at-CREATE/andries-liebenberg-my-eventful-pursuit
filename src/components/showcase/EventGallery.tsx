import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CardGrid } from "@/components/shared/card-grid";

const photos = ["01", "02", "03", "04", "05", "08", "10"].map(id => ({
  src: `/media/events/event-production-${id}.webp`,
  title: id === "02" || id === "03" ? "Rig and technical build" : "Event production",
}));
const CAPTION = "Event production by Andries, 360 Vision Events";

export function EventGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : photos[selectedIndex];
  return <>
    <CardGrid>{photos.map((photo, index) => <figure key={photo.src} className="h-full flex flex-col">
      <Button variant="ghost" onClick={() => setSelectedIndex(index)} className="unified-card h-auto p-0 overflow-hidden w-full rounded-lg" aria-label={`View ${photo.title} photo ${index + 1}`}>
        <img src={photo.src} alt={photo.title} className="aspect-video w-full object-cover" width="1485" height="768" loading="lazy" />
      </Button>
      <figcaption className="py-4"><h3 className="font-semibold text-foreground mb-2">{photo.title}</h3><p className="text-caption text-muted-foreground">{CAPTION}</p></figcaption>
    </figure>)}</CardGrid>
    <Dialog open={selected !== null} onOpenChange={isOpen => { if (!isOpen) setSelectedIndex(null); }}>
      <DialogContent className="max-w-5xl p-4 bg-background">
        {selected && <><DialogTitle>{selected.title}</DialogTitle><DialogDescription>{CAPTION}</DialogDescription>
          <img src={selected.src} alt={selected.title} width="1485" height="768" className="w-full max-h-[65vh] object-contain" />
          <div className="flex justify-between gap-4"><Button variant="outline" onClick={() => setSelectedIndex(index => ((index ?? 0) + photos.length - 1) % photos.length)} aria-label="Previous image">←</Button><Button variant="outline" onClick={() => setSelectedIndex(index => ((index ?? 0) + 1) % photos.length)} aria-label="Next image">→</Button></div>
        </>}
      </DialogContent>
    </Dialog>
  </>;
}
