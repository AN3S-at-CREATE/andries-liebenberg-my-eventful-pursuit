import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HeroMedia } from "./hero-media";

describe("HeroMedia playback recovery", () => {
  beforeEach(() => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: no-preference)",
      onchange: null,
      addListener: vi.fn(), removeListener: vi.fn(),
      addEventListener: vi.fn(), removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    });
    vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
  });
  afterEach(() => { cleanup(); vi.restoreAllMocks(); });

  it("offers a manual retry for rejected playback and clears it after playback starts", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play")
      .mockRejectedValueOnce(new DOMException("Interrupted", "AbortError"))
      .mockResolvedValue(undefined);
    const { container } = render(<HeroMedia src="/media/hero-intro.mp4" />);
    fireEvent.click(await screen.findByRole("button", { name: "Play" }));
    expect(play).toHaveBeenCalledTimes(2);
    const video = container.querySelector("video");
    if (!video) throw new Error("Expected arrival video");
    expect(video.muted).toBe(true);
    fireEvent.playing(video);
    expect(screen.queryByRole("button", { name: "Play" })).not.toBeInTheDocument();
  });

  it("retries when a visible page resumes and exposes a retry if the video pauses", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    const { container } = render(<HeroMedia src="/media/hero-intro.mp4" />);
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
    fireEvent(window, new Event("pageshow"));
    expect(play).toHaveBeenCalledTimes(2);
    const video = container.querySelector("video");
    if (!video) throw new Error("Expected arrival video");
    fireEvent.pause(video);
    expect(screen.getByRole("button", { name: "Play" })).toBeInTheDocument();
  });
});