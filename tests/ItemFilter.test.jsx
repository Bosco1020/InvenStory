import { beforeEach, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import FilterItems from "../src/components/FilterItems";

describe("Filter Items test", () => {
  const mockedOpen = vi.fn();
  beforeEach(() => {
    render(<FilterItems setOpen={mockedOpen} />, {
      wrapper: MemoryRouter,
    });
  });
  test("Clicking `Filter` button opens Filters", async () => {
    const openFilter = screen.getByText(`Filter`);

    await userEvent.click(openFilter);

    const nameSearch = screen.queryByPlaceholderText("Search by Name");
    const tagSearch = screen.queryByPlaceholderText("Search by Tag");

    expect(nameSearch).toBeInTheDocument();
    expect(tagSearch).toBeInTheDocument();
  });

  test("Clicking `Close Filter` button closes Filters", async () => {
    const openFilter = screen.getByText(`Filter`);
    await userEvent.click(openFilter);

    const closeFilter = screen.getByText(`Close Filter`);

    await userEvent.click(closeFilter);

    const nameSearch = screen.queryByPlaceholderText("Search by Name");
    const tagSearch = screen.queryByPlaceholderText("Search by Tag");

    expect(nameSearch).not.toBeInTheDocument();
    expect(tagSearch).not.toBeInTheDocument();
  });

  test("Clicking `Add Item` button opens Modal", async () => {
    const openModal = screen.getByText(`Add Item`);

    await userEvent.click(openModal);

    expect(mockedOpen).toBeCalled(1);
  });
});
