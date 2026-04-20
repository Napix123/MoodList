import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach } from "vitest";
import Login from "../pages/Login";

describe("Login", () => {
    beforeEach(() => {
        Object.defineProperty(window, "location", {
            value: {href: ""},
            writable: true,
        });
    });

    it("renders the title", () => {
        render(<Login />)
        expect(screen.getAllByText(/moodlist/i).length).toBeGreaterThan(0);
    })

    it("renders connect button", () => {
        render(<Login />)
        expect(screen.getByText(/connect now/i)).toBeInTheDocument();
    })

    it("redirects to spotify on button click", async () => {
        const user = userEvent.setup()
        render(<Login />)
        await user.click(screen.getByText(/connect now/i));
        expect(window.location.href).toContain("/auth/login");
    });
});