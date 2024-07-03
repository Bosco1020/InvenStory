import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../src/App";
import {
  getAllItemsData,
  getUsersItemsData,
} from "../src/service/items.service.js";

import getTestItems from "./data/testItems.js";
const { testItems, dbItems } = await getTestItems();

vi.mock("../src/service/items.service.js", () => ({
  default: {
    getAllItemsData: vi.fn(),
    getUsersItemsData: vi.fn(),
  },
  getAllItemsData: vi.fn(),
  getUsersItemsData: vi.fn(),
}));

describe("App tests", () => {
  const testUser = {
    name: "Sammy",
    email: "SammE@example.com",
    password: "SamPass22!",
    assignedItems: ["Book", "Elder Wand"],
    role: 1,
  };

  beforeEach(() => {
    localStorage.setItem(`user`, JSON.stringify(testUser));

    getAllItemsData.mockClear();
    getAllItemsData.mockResolvedValue(dbItems);

    getUsersItemsData.mockClear();
    getUsersItemsData.mockResolvedValue(dbItems);

    render(<App />, {
      wrapper: MemoryRouter,
    });
  });

  describe("Initial render tests", () => {
    test("App.jsx renders correctly", () => {
      render(<App />, { wrapper: MemoryRouter });
      const loading = screen.getAllByText("Loading...");

      expect(loading.length).toEqual(2);
    });
  });
});
