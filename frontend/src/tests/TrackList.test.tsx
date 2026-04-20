import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TrackList from "../components/TrackList";
import type { Track } from "../types";

const mockTracks: Track[] = [
  { id: "1", title: "Nightcall", artist: "Kavinsky", album: "Nightcall", reason: "dark synth feel" },
  { id: "2", title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", reason: "driving beat" },
];

describe("TrackList", () => {
    it("renders all tracks", () => {
        render(<TrackList tracks={mockTracks} />)
        expect(screen.getByText("Nightcall")).toBeInTheDocument();
        expect(screen.getByText("Blinding Lights")).toBeInTheDocument();
    })

    it("renders artist names", () => {
        render(<TrackList tracks={mockTracks} />)
        expect(screen.getByText("Kavinsky")).toBeInTheDocument();
        expect(screen.getByText("The Weeknd")).toBeInTheDocument();
    })

    it("renders track numbers", () => {
        render(<TrackList tracks={mockTracks} />)
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    })

    it("renders reasons", () => {
        render(<TrackList tracks={mockTracks} />)
        expect(screen.getByText("dark synth feel")).toBeInTheDocument();
        expect(screen.getByText("driving beat")).toBeInTheDocument();
    })

    it("renders empty list without crashing", () => {
        render(<TrackList tracks={[]} />)
        expect(screen.queryByText("1")).not.toBeInTheDocument();
        expect(screen.queryByText("2")).not.toBeInTheDocument();
    });
});