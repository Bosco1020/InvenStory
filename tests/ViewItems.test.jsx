import { beforeEach, describe } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import {
  getAllItemsData,
  getUsersItemsData,
} from "../src/service/items.service.js";

import ViewItems from "../src/components/ViewItems.jsx";
import getTestItems from "./data/testItems.js";
const { testItems, dbItems } = await getTestItems();

describe("View Items", () => {
  describe("Initial Render Tests", () => {
    vi.mock("../src/service/items.service.js", () => ({
      default: {
        getAllItemsData: vi.fn(),
        getUsersItemsData: vi.fn(),
      },
      getAllItemsData: vi.fn(),
      getUsersItemsData: vi.fn(),
    }));

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

      render(<ViewItems />, {
        wrapper: MemoryRouter,
      });
    });

    test("Displays 'Loading...' on initial render", async () => {
      const loading = screen.getByText("Loading...");

      expect(loading).toBeInTheDocument();
    });

    test("'Loading...' disappears", async () => {
      const loading = screen.getByText("Loading...");

      await waitForElementToBeRemoved(() => screen.getByText(`Loading...`));

      expect(loading).not.toBeInTheDocument();
    });
  });

  describe("Render Player Items Tests", () => {
    vi.mock("../src/service/items.service.js", () => ({
      default: {
        getAllItemsData: vi.fn(),
        getUsersItemsData: vi.fn(),
      },
      getAllItemsData: vi.fn(),
      getUsersItemsData: vi.fn(),
    }));

    const testUser = {
      name: "Sammy",
      email: "SammE@example.com",
      password: "SamPass22!",
      assignedItems: ["Book", "Elder Wand"],
      role: 1,
    };

    beforeEach(async () => {
      localStorage.setItem(`user`, JSON.stringify(testUser));

      getAllItemsData.mockClear();
      getAllItemsData.mockResolvedValue(dbItems);

      getUsersItemsData.mockClear();
      getUsersItemsData.mockResolvedValue(dbItems);

      render(<ViewItems />, {
        wrapper: MemoryRouter,
      });
      await waitForElementToBeRemoved(() => screen.getByText(`Loading...`));

      // await waitForElementToBeRemoved(() => screen.getAllByText(`Loading...`));
    });

    test("Renders all item components", async () => {
      const ItemCount = screen.getAllByText("Sample Test");
      expect(ItemCount.length).toEqual(dbItems.length);
    });

    test("Renders correct item data", async () => {
      const name1 = screen.getByText(dbItems[0].name);
      const name2 = screen.getByText(dbItems[1].name);
      const name3 = screen.getByText(dbItems[2].name);
      const name4 = screen.getByText(dbItems[3].name);
      const name5 = screen.getByText(dbItems[4].name);
      expect(name1).toBeInTheDocument();
      expect(name2).toBeInTheDocument();
      expect(name3).toBeInTheDocument();
      expect(name4).toBeInTheDocument();
      expect(name5).toBeInTheDocument();
    });

    test("Calls render for Player items only", async () => {
      expect(getUsersItemsData).toHaveBeenCalled();
      expect(getAllItemsData).not.toHaveBeenCalled();
    });
  });

  describe("Render Admin Items Tests", () => {
    vi.mock("../src/service/items.service.js", () => ({
      default: {
        getAllItemsData: vi.fn(),
        getUsersItemsData: vi.fn(),
      },
      getAllItemsData: vi.fn(),
      getUsersItemsData: vi.fn(),
    }));

    const testUser = {
      name: "Sammy",
      email: "SammE@example.com",
      password: "SamPass22!",
      assignedItems: ["Book", "Elder Wand"],
      role: 2,
    };

    beforeEach(async () => {
      localStorage.setItem(`user`, JSON.stringify(testUser));

      getAllItemsData.mockClear();
      getAllItemsData.mockResolvedValue(dbItems);

      getUsersItemsData.mockClear();
      getUsersItemsData.mockResolvedValue(dbItems);

      render(<ViewItems />, {
        wrapper: MemoryRouter,
      });
      await waitForElementToBeRemoved(() => screen.getByText(`Loading...`));

      // await waitForElementToBeRemoved(() => screen.getAllByText(`Loading...`));
    });

    test("Renders all item components", async () => {
      const ItemCount = screen.getAllByText("Sample Test");
      expect(ItemCount.length).toEqual(dbItems.length);
    });

    test("Renders correct item data", async () => {
      const name1 = screen.getByText(dbItems[0].name);
      const name2 = screen.getByText(dbItems[1].name);
      const name3 = screen.getByText(dbItems[2].name);
      const name4 = screen.getByText(dbItems[3].name);
      const name5 = screen.getByText(dbItems[4].name);
      expect(name1).toBeInTheDocument();
      expect(name2).toBeInTheDocument();
      expect(name3).toBeInTheDocument();
      expect(name4).toBeInTheDocument();
      expect(name5).toBeInTheDocument();
    });

    test("Calls render for Player items only", async () => {
      expect(getUsersItemsData).not.toHaveBeenCalled();
      expect(getAllItemsData).toHaveBeenCalled();
    });
  });
});
