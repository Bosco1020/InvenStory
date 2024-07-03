import axiosMock from "axios";
import { getAllUsers, addItem, editItem, deleteItem } from "../../src/service/admin.service";

import getTestItems from "../data/testItems";
const { testItems, dbItems } = await getTestItems();

import { afterEach, beforeEach } from "vitest";

vi.mock('axios');

describe('External Data Tests', () => {
   
    let functionResult;   
    
    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('getAllUsers service test', () => {
    
        describe('Normal Data Returned', () => {

            const expectedReturn = { data: dbItems, status: 200 }

            beforeEach(async () => {
                axiosMock.get.mockResolvedValueOnce(expectedReturn);
                functionResult = await getAllUsers();
            });

            test('should call axios.get once with supplied URL', async () => {
                expect(axiosMock.get).toHaveBeenCalledTimes(1);
            });

            test('should return sample items when valid data is returned from server', async () => {
                expect(functionResult).toEqual(expect.arrayContaining(dbItems));
            });
        });

        describe('EmptyArray Returned', () => {
           
            test('should return nothing', async () => {
                const expectedReturn = { data: [], status: 200 };
                axiosMock.get.mockResolvedValueOnce(expectedReturn);
                functionResult = await getAllUsers();

                expect(functionResult.message).toEqual(undefined);
            });
        });

        describe('Error Returned', () => {
           
            test('should return an Error object with provided error message', async () => {
                const expectedReturn = new Error(`Test GET Error`);
                axiosMock.get.mockRejectedValueOnce(expectedReturn);
                functionResult = await getAllUsers();

                expect(functionResult.message).toBe(expectedReturn.message);
            });
        });
    });
    describe('addItem service test', () => {
    
        describe('Normal Data Returned', () => {

            const expectedReturn = { data: dbItems, status: 201 }

            beforeEach(async () => {
                axiosMock.post.mockResolvedValueOnce(expectedReturn);
                functionResult = await addItem();
            });

            test('should call axios.post once with supplied URL', async () => {
                expect(axiosMock.post).toHaveBeenCalledTimes(1);
            });

            test('should return sample items when valid data is returned from server', async () => {
                expect(functionResult).toEqual(expect.arrayContaining(dbItems));
            });
        });

        describe('EmptyArray Returned', () => {
           
            test('should return nothing', async () => {
                const expectedReturn = { data: [], status: 201 };
                axiosMock.post.mockResolvedValueOnce(expectedReturn);
                functionResult = await addItem();

                expect(functionResult.message).toEqual(undefined);
            });
        });

        describe('Error Returned', () => {
           
            test('should return an Error object with provided error message', async () => {
                const expectedReturn = new Error(`Test POST Error`);
                axiosMock.post.mockRejectedValueOnce(expectedReturn);
                functionResult = await addItem();

                expect(functionResult.message).toBe(expectedReturn.message);
            });
        });
    });
    describe('editItem service test', () => {
    
        describe('Normal Data Returned', () => {

            const expectedReturn = { data: dbItems, status: 201 }

            beforeEach(async () => {
                axiosMock.put.mockResolvedValueOnce(expectedReturn);
                functionResult = await editItem();
            });

            test('should call axios.post once with supplied URL', async () => {
                expect(axiosMock.put).toHaveBeenCalledTimes(1);
            });

            test('should return sample items when valid data is returned from server', async () => {
                expect(functionResult).toEqual(expect.arrayContaining(dbItems));
            });
        });

        describe('EmptyArray Returned', () => {
           
            test('should return nothing', async () => {
                const expectedReturn = { data: [], status: 201 };
                axiosMock.put.mockResolvedValueOnce(expectedReturn);
                functionResult = await editItem();

                expect(functionResult.message).toEqual(undefined);
            });
        });

        describe('Error Returned', () => {
           
            test('should return an Error object with provided error message', async () => {
                const expectedReturn = new Error(`Test POST Error`);
                axiosMock.put.mockRejectedValueOnce(expectedReturn);
                functionResult = await editItem();

                expect(functionResult.message).toBe(expectedReturn.message);
            });
        });
    });
    describe('deleteItem service test', () => {
    
        describe('Normal Data Returned', () => {

            const expectedReturn = { data: dbItems, status: 201 }

            beforeEach(async () => {
                axiosMock.delete.mockResolvedValueOnce(expectedReturn);
                functionResult = await deleteItem();
            });

            test('should call axios.post once with supplied URL', async () => {
                expect(axiosMock.delete).toHaveBeenCalledTimes(1);
            });

            test('should return sample items when valid data is returned from server', async () => {
                expect(functionResult).toEqual(expect.arrayContaining(dbItems));
            });
        });

        describe('EmptyArray Returned', () => {
           
            test('should return nothing', async () => {
                const expectedReturn = { data: [], status: 201 };
                axiosMock.delete.mockResolvedValueOnce(expectedReturn);
                functionResult = await deleteItem();

                expect(functionResult.message).toEqual(undefined);
            });
        });

        describe('Error Returned', () => {
           
            test('should return an Error object with provided error message', async () => {
                const expectedReturn = new Error(`Test POST Error`);
                axiosMock.delete.mockRejectedValueOnce(expectedReturn);
                functionResult = await deleteItem();

                expect(functionResult.message).toBe(expectedReturn.message);
            });
        });
    });

    describe('getAllUsers tests', () => {
        const testUser = {
            "name": "Sammy",
            "email": "SammE@example.com",
            "password": "SamPass22!",
            "assignedItems": ["Book", "Elder Wand"],
            "role": 1
        };

        beforeEach(() => {
            localStorage.setItem(`user`, JSON.stringify(testUser));
        })

        afterEach(() => {
            localStorage.removeItem(`user`);
        })

        describe('GET retrieve users with item', () => {

            test('should call axios GET with data', async () => {
                const tags = {tagList: ["Wand", "Book"]}
                functionResult = await getAllUsers(tags);

                expect(axiosMock.get).toHaveBeenCalledTimes(1);                
            });
        });
    });
});
