import { beforeEach, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import ItemDetails from "../src/components/ItemDetails.jsx";
import { MemoryRouter } from "react-router-dom";

describe("Item Details test", () => {
  test("Displays details passed in", async () => {
    const Details = { name: "Test Name" };
    const Tags = "Tag1, Tag2";
    render(<ItemDetails details={Details} tags={Tags} />, {
      wrapper: MemoryRouter,
    });

    const Item_Details = screen.getByText("Test Name");
    const Item_Tags = screen.getByText("Tags: Tag1, Tag2");

    expect(Item_Details).toBeInTheDocument();
    expect(Item_Tags).toBeInTheDocument();
  });
});
