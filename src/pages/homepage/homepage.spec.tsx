import { render, screen, fireEvent } from "@testing-library/react";
import Homepage from ".";
import { BrowserRouter } from "react-router-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vitest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vitest.fn(),
    removeListener: vitest.fn(),
    addEventListener: vitest.fn(),
    removeEventListener: vitest.fn(),
    dispatchEvent: vitest.fn(),
  })),
});

describe("Homepage", () => {
  it("renders action buttons correctly", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    const openListButton = screen.getByText("Open Existing List");
    const createListButton = screen.getByText("Create New List");

    expect(openListButton).toBeVisible();
    expect(createListButton).toBeVisible();
  });

  it("opens create modal when 'Create New List' button is clicked", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    const createListButton = screen.getByText("Create New List");

    fireEvent.click(createListButton);

    const modal = screen.getByRole("dialog");

    expect(modal).toBeInTheDocument();
  });

  it("submits form and closes modal when form is filled and submitted", () => {
    render(
      <BrowserRouter>
        <Homepage />
      </BrowserRouter>
    );

    const createListButton = screen.getByText("Create New List");

    fireEvent.click(createListButton);

    const nameInput = screen.getByLabelText("Item Name");
    const quantityInput = screen.getByLabelText("Quantity");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(nameInput, { target: { value: "Test Item" } });
    fireEvent.change(quantityInput, { target: { value: "10" } });
    fireEvent.click(submitButton);

    // Check if the modal is closed
    const modal = screen.getByRole("dialog");
    expect(modal).not.toBeVisible();
  });
});
