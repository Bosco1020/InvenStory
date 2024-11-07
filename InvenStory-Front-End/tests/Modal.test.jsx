import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Modal from "../src/components/Modal.jsx";
import {
  getAllItemsData,
  getUsersItemsData,
} from "../src/service/items.service.js";

import getTestItems from "./data/testItems.js";
const { testItems, dbItems } = await getTestItems();
//CloseModal, item, isNew
describe("Edit Modal Tests", () => {
  const mockCloseModal = vi.fn();
  beforeEach(() => {
    render(
      <Modal CloseModal={mockCloseModal} item={testItems[0]} isNew={false} />,
      {
        wrapper: MemoryRouter,
      }
    );
  });

  test("Modal Renders inputs with item details", () => {
    const name = screen.queryByPlaceholderText("Item Name");
    const description = screen.queryByPlaceholderText("Add a description");
    const tags = screen.queryByPlaceholderText(
      "Add Tags Here: Separate, Each, With, A, Comma"
    );

    expect(name.value).toEqual(testItems[0].name);
    expect(description.value).toEqual(testItems[0].description);
    expect(tags.value).toEqual("Item, Book, Forest");
  });

  test("should call the CloseModal function when the X is clicked", async () => {
    const modalX = screen.getAllByRole(`button`)[0];

    await userEvent.click(modalX);

    expect(mockCloseModal).toHaveBeenCalled();
  });

  test("should call the CloseModal function when Close button is clicked", async () => {
    const modalX = screen.getAllByRole(`button`)[2];

    await userEvent.click(modalX);

    expect(mockCloseModal).toHaveBeenCalled();
  });

  test("should call the CloseModal function when the Submit button is clicked", async () => {
    const modalX = screen.getAllByRole(`button`)[1];

    await userEvent.click(modalX);

    expect(mockCloseModal).toHaveBeenCalled();
  });
});

describe("Add Modal Tests", () => {
  const mockCloseModal = vi.fn();

  beforeEach(() => {
    render(
      <Modal CloseModal={mockCloseModal} item={testItems[0]} isNew={true} />,
      {
        wrapper: MemoryRouter,
      }
    );
  });

  test("Modal Renders blank inputs", () => {
    const name = screen.queryByPlaceholderText("Item Name");
    const description = screen.queryByPlaceholderText("Add a description");
    const tags = screen.queryByPlaceholderText(
      "Add Tags Here: Separate, Each, With, A, Comma"
    );

    expect(name.value).toEqual("");
    expect(description.value).toEqual("");
    expect(tags.value).toEqual("");
  });

  test("should call the CloseModal function when the X is clicked", async () => {
    const modalX = screen.getAllByRole(`button`)[0];

    await userEvent.click(modalX);

    expect(mockCloseModal).toHaveBeenCalled();
  });

  test("should call the CloseModal function when Close button is clicked", async () => {
    const modalX = screen.getAllByRole(`button`)[2];

    await userEvent.click(modalX);

    expect(mockCloseModal).toHaveBeenCalled();
  });

  test("should call the CloseModal function when the Submit button is clicked", async () => {
    const modalX = screen.getAllByRole(`button`)[1];

    await userEvent.click(modalX);

    expect(mockCloseModal).toHaveBeenCalled();
  });
});
