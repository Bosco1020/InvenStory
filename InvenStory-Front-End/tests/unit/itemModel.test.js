import ItemModel from '../../src/utils/Item.model';

test(`It should create the expected object when the constructor is called`, () => {
    const [_id, name, description, tagList] = [`111`, `Test`, `Test Desc`, ["Test Tag 1", "Test Tag 2"]];

    const testItem = new ItemModel(_id, name, description, tagList);

    expect(testItem._id).toBe(_id);
    expect(testItem.name).toBe(name);
    expect(testItem.description).toBe(description);
    expect(testItem.tagList[0]).toBe(tagList[0]);
    expect(testItem.tagList[1]).toBe(tagList[1]);
    expect(testItem).toBeInstanceOf(ItemModel);
})