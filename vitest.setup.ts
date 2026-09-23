import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

vi.mock("next/image", () => ({
    default: (props: any) => {
        return React.createElement("img", props);
    },
}));