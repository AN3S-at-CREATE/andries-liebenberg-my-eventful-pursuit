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

  it("retries when a visible page resumes and automatically recovers an unexpected pause", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    const { container } = render(<HeroMedia src="/media/hero-intro.mp4" />);
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
    fireEvent(window, new Event("pageshow"));
    expect(play).toHaveBeenCalledTimes(2);
    const video = container.querySelector("video");
    if (!video) throw new Error("Expected arrival video");
    fireEvent.pause(video);
    expect(play).toHaveBeenCalledTimes(3);
    expect(screen.queryByRole("button", { name: "Play" })).not.toBeInTheDocument();
  });

  it("restarts at the beginning if the browser ends the looping film", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    const { container } = render(<HeroMedia src="/media/hero-intro.mp4" />);
    await waitFor(() => expect(play).toHaveBeenCalledTimes(1));
    const video = container.querySelector("video");
    if (!video) throw new Error("Expected arrival video");
    video.currentTime = 15;
    fireEvent.ended(video);
    expect(video.currentTime).toBe(0);
    expect(video.loop).toBe(true);
    expect(play).toHaveBeenCalledTimes(2);
  });

  it("does not resume a film while its page is inactive", async () => {
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    const { container } = render(<HeroMedia src="/media/hero-loop.mp4" active={false} />);
    const video = container.querySelector("video");
    if (!video) throw new Error("Expected nebula video");
    fireEvent.pause(video);
    fireEvent.ended(video);
    expect(play).not.toHaveBeenCalled();
  });
});