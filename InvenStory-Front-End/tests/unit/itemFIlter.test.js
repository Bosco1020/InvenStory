import { describe } from "vitest";
import { filterByTag } from "../../src/utils/item-filter";

import getTestItems from "../data/testItems";
const { testItems, dbItems } = await getTestItems();

describe(("Item Filter Service tests"), () => {
    let Filters = {name: "", tag: ""}
    test(("Returns empty array if no filters"), () => {
        const res = filterByTag(Filters, dbItems);
        expect(res).toEqual([]);
    })

    afterEach(() => {
        Filters = { name: "", tag: "" };
    })

    test(("Returns array matching name if name filter applied"), () => {
        Filters.name = "Book";
        const res = filterByTag(Filters, dbItems);
        expect(res[0]).toEqual(dbItems[0]);
    })

    test(("Returns array of matching tag if tag filter applied"), () => {
        Filters.tag = "Item";
        const res = filterByTag(Filters, dbItems);
        expect(res.length).toEqual(3);
    })

    test(("Returns array of matching name and tag if both filters applied"), () => {
        Filters.tag = "Forest";
        Filters.name = "Buzz Movie";
        const res = filterByTag(Filters, dbItems);
        expect(res.length).toEqual(1);
    })
})