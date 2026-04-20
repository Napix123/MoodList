import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Library from "../pages/Library";

vi.mock("../api/client", () => ({
    generatePlaylist: vi.fn(),
}));

describe("Library", () => {
    it("renders the heading", () => {
        render(
            <MemoryRouter>
                <Library />
            </MemoryRouter>
        );
        expect(screen.getAllByText(/what's/i)[0]).toBeInTheDocument();
    });

    it("renders vibe pills", () => {
        render(
            <MemoryRouter>
                <Library />
            </MemoryRouter>
        );
        expect(screen.getByText(/late night drive/i)).toBeInTheDocument();
    });
});