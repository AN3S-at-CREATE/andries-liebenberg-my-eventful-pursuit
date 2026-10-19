import { describe, expect, it } from "vitest";
import { labStars, labDemos, labWorkshopCount } from "@/data/lab";
import { visibleLabWorkshops } from "./lab-workshops";
import { getOffer } from "./labOffers";
import { labSignal, positionLabStars, visibleConstellations, visibleLabStars } from "./lab-galaxy";

describe("Lab evidence and catalogue rules", () => {
  it("resolves every star's offer from the approved catalogue", () => {
    for (const star of labStars) for (const title of star.offers) expect(getOffer(title), `${star.slug}: ${title}`).toBeDefined();
  });
  it("requires a nonempty source on every star", () => {
    for (const star of labStars) expect(star.source.trim().length).toBeGreaterThan(0);
  });
  it("allows only Concierge to be live", () => {
    expect(labStars.filter(star => star.status === "live").map(star => star.slug)).toEqual(["concierge"]);
  });
  it("excludes unapproved stars from counts and routes", () => {
    expect(visibleLabStars()).toHaveLength(19);
    expect(visibleLabStars().some(star => star.slug === "truelogix")).toBe(false);
    expect(visibleConstellations().map(group => group.id)).toEqual(["ai", "agents", "build", "ventures"]);
  });
  it("keeps eight replay modules labelled and counts documented workshops", () => {
    expect(Object.keys(labDemos)).toEqual(["lynkie", "eventpulse", "knowledge", "whatsapp", "workflow", "voice", "concierge", "bots"]);
    for (const demo of Object.values(labDemos)) expect(demo.replay.assistant.startsWith("Replay")).toBe(true);
    expect(labWorkshopCount).toBe(visibleLabWorkshops().length);
  });
  it("defaults to All on desktop and AI on mobile", () => {
    expect(labSignal(null, false)).toBe("all"); expect(labSignal(null, true)).toBe("ai");
    expect(labSignal("unknown", false)).toBe("all"); expect(labSignal("agents", true)).toBe("agents");
  });
  it("positions appended stars from data rather than their slugs", () => {
    const star = visibleLabStars()[0];
    const positions = positionLabStars(Array.from({ length: 10 }, (_, index) => ({ ...star, slug: `test-${index}` })));
    expect(new Set(positions.map(point => `${point.x},${point.y}`)).size).toBe(10);
  });
});
