import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi} from "vitest"
import PromptBar from "../components/PromptBar"

describe("PromptBar", () => {
    it("renders the textarea and button", () => {
        render(<PromptBar onGenerate={vi.fn()} loading={false} />);
        expect(screen.getByPlaceholderText(/late night drive through the city/i)).toBeInTheDocument();
        expect(screen.getByText(/curate playlist/i)).toBeInTheDocument();
    })

    it("button is disabled when the prompt is empty", () =>{
        render(<PromptBar onGenerate={vi.fn()} loading={false} />);
        expect(screen.getByText(/curate playlist/i)).toBeDisabled();
    })

    it("button is disabled when loading", async () => {
        render(<PromptBar onGenerate={vi.fn()} loading={true} />);
        expect(screen.getByText(/curating/i)).toBeDisabled();
    })

    it("calls onGenerate with prompt when button clicked", async () => {
        const onGenerate = vi.fn();
        const user = userEvent.setup();
        render(<PromptBar onGenerate={onGenerate} loading={false} />);
        const textarea = screen.getByPlaceholderText(/late night drive through the city/i);
        await user.type(textarea, "late night drive");
        const button = screen.getByText(/curate playlist/i);
        expect(button).not.toBeDisabled();
        await user.click(button);
        expect(onGenerate).toHaveBeenCalledWith("late night drive");
    })
})