import { useEffect } from "react";
import { act, cleanup, render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import { NebulaFilm } from "./nebula-film";

const playback = vi.hoisted(() => ({ mount: vi.fn(), unmount: vi.fn(), props: vi.fn() }));
vi.mock("./hero-media", () => ({
  HeroMedia: (props: { active: boolean; src: string }) => {
    playback.props(props);
    useEffect(() => {
      playback.mount();
      return playback.unmount;
    }, []);
    return null;
  },
}));

afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe("Persistent nebula lifecycle", () => {
  it("does not initialise the nebula on a fresh home visit", () => {
    const router = createMemoryRouter([{ path: "*", element: <NebulaFilm /> }], { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);
    expect(playback.mount).not.toHaveBeenCalled();
    expect(playback.props).not.toHaveBeenCalled();
  });

  it("starts on inner pages and preserves its instance while pausing on home", async () => {
    const router = createMemoryRouter([{ path: "*", element: <NebulaFilm /> }], { initialEntries: ["/services"] });
    render(<RouterProvider router={router} />);
    expect(playback.props).toHaveBeenLastCalledWith(expect.objectContaining({ active: true, src: "/media/hero-loop.mp4" }));
    await act(async () => { await router.navigate("/work"); });
    await act(async () => { await router.navigate("/"); });
    expect(playback.props).toHaveBeenLastCalledWith(expect.objectContaining({ active: false }));
    await act(async () => { await router.navigate("/contact"); });
    expect(playback.props).toHaveBeenLastCalledWith(expect.objectContaining({ active: true }));
    expect(playback.mount).toHaveBeenCalledTimes(1);
    expect(playback.unmount).not.toHaveBeenCalled();
  });
});