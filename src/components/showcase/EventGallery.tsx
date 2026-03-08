import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";

import eventCorporate from "@/assets/showcase/event-corporate.jpg";
import eventGala from "@/assets/showcase/event-gala.jpg";
import eventFestival from "@/assets/showcase/event-festival.jpg";
import eventExpo from "@/assets/showcase/event-expo.jpg";
import eventVip from "@/assets/showcase/event-vip.jpg";
import eventSummit from "@/assets/showcase/event-summit.jpg";

interface GalleryImage {
  src: string;
  title: string;
  category: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    src: eventCorporate,
    title: "Corporate Conference",
    category: "Corporate Events",
    description: "Large-scale corporate event with dramatic stage production and LED displays."
  },
  {
    src: eventGala,
    title: "Awards Gala Dinner",
    category: "Gala & Awards",
    description: "Elegant awards ceremony with premium dining and entertainment."
  },
  {
    src: eventFestival,
    title: "Festival Production",
    category: "Festivals",
    description: "Outdoor festival with massive stage, lighting rigs, and crowd engagement."
  },
  {
    src: eventExpo,
    title: "Technology Expo",
    category: "Exhibitions",
    description: "Interactive exhibition with cutting-edge booth designs and displays."
  },
  {
    src: eventVip,
    title: "VIP Networking",
    category: "VIP Events",
    description: "Exclusive networking reception with premium hospitality services."
  },
  {
    src: eventSummit,
    title: "International Summit",
    category: "Conferences",
    description: "World-class summit with keynote presentations and international delegates."
  }
];

export const EventGallery = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? galleryImages.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === galleryImages.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  // Support ArrowLeft and ArrowRight keyboard navigation
  // Note: Radix UI Dialog already traps focus and handles Escape to close
  const handleKeyDownLightbox = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-xl aspect-video focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            onClick={() => openLightbox(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(index);
              }
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            role="button"
            tabIndex={0}
            aria-label={`View ${image.title} in lightbox`}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              width="1024"
              height="576"
            />
            
            {/* Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent transition-opacity duration-300 ${
              hoveredIndex === index ? 'opacity-90' : 'opacity-0'
            }`} />
            
            {/* Glow border on hover */}
            <div className={`absolute inset-0 border-2 rounded-xl transition-all duration-300 ${
              hoveredIndex === index 
                ? 'border-primary shadow-[0_0_20px_hsl(var(--primary)/0.5)]' 
                : 'border-transparent'
            }`} />
            
            {/* Content overlay */}
            <div className={`absolute inset-0 p-4 flex flex-col justify-end transition-all duration-300 ${
              hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Badge variant="glow-cyan" className="w-fit mb-2">{image.category}</Badge>
              <h3 className="font-heading text-lg font-bold text-foreground">{image.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{image.description}</p>
            </div>

            {/* Zoom icon */}
            <div className={`absolute top-4 right-4 p-2 rounded-full bg-primary/20 backdrop-blur-sm transition-all duration-300 ${
              hoveredIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}>
              <ZoomIn className="h-5 w-5 text-primary" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent
          className="max-w-5xl w-full p-0 bg-background/95 backdrop-blur-xl border-border/50"
          onKeyDown={handleKeyDownLightbox}
        >
          {selectedIndex !== null && (
            <div className="relative">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/50 hover:bg-background/80"
                onClick={closeLightbox}
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80"
                onClick={goToPrevious}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80"
                onClick={goToNext}
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Image */}
              <img
                src={galleryImages[selectedIndex].src}
                alt={galleryImages[selectedIndex].title}
                className="w-full h-auto rounded-t-lg"
                loading="lazy"
                decoding="async"
                width="1024"
                height="576"
              />

              {/* Info bar */}
              <div className="p-6 border-t border-border/50">
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="glow-cyan">{galleryImages[selectedIndex].category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {selectedIndex + 1} / {galleryImages.length}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {galleryImages[selectedIndex].title}
                </h3>
                <p className="text-muted-foreground">
                  {galleryImages[selectedIndex].description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
