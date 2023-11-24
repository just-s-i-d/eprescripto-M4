import { render, screen } from "@testing-library/react";
import {expect,it,describe} from "vitest"
import "@testing-library/jest-dom";

import App from "../App";

describe("Hello", () => {
    it("first test", () => {
        render(<App />)
        const heading = screen.getByText("Vite + React");
        expect(heading).toBeInTheDocument();
    });
});
