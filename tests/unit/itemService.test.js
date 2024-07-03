import axiosMock from "axios";
import { getAllItemsData, getUsersItemsData } from "../../src/service/items.service";
import getTestItems from "../data/testItems";
import { afterEach, beforeEach } from "vitest";
const { testItems, dbItems } = await getTestItems();

vi.mock('axios');

describe('External Data Tests', () => {
   
    let functionResult;   
    
    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('getItems Service tests', () => {
    
        describe('Normal Data Returned', () => {

            const expectedReturn = { data: dbItems, status: 200 }

            beforeEach(async () => {
                axiosMock.get.mockResolvedValueOnce(expectedReturn);
                functionResult = await getAllItemsData();
            });

            test('should call axios.get once with supplied URL', async () => {
                expect(axiosMock.get).toHaveBeenCalledTimes(1);
                // expect(axiosMock.get).toHaveBeenCalledWith(`${import.meta.env.VITE_APP_API_URL}/allitems`);
            });

            test('should return sample items when valid data is returned from server', async () => {
                expect(functionResult).toEqual(expect.arrayContaining(dbItems));
            });
        });

        describe('EmptyArray Returned', () => {
           
            test('should return nothing', async () => {
                const expectedReturn = { data: [], status: 200 };
                axiosMock.get.mockResolvedValueOnce(expectedReturn);
                functionResult = await getAllItemsData();

                expect(functionResult.message).toEqual(undefined);
            });
        });

        describe('Error Returned', () => {
           
            test('should return an Error object with provided error message', async () => {
                const expectedReturn = new Error(`Test GET Error`);
                axiosMock.get.mockRejectedValueOnce(expectedReturn);
                functionResult = await getAllItemsData();

                expect(functionResult.message).toBe(expectedReturn.message);
            });
        });
    });
    describe('getUsersItemsData tests', () => {
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

        describe('POST retrieve items assigned to user', () => {
            // const testSubmittedTodo = {
            //     todoDescription: `New Test Todo`,
            //     todoDateCreated: new Date().toUTCString(),
            //     todoCompleted: false
            // }
            
            // const test_id = generateTodoId();

            test('should call axios post with correct URL and data', async () => {
                const User = JSON.parse(localStorage.getItem(`user`));
                delete User['accessToken'];
                delete User['_id'];

                functionResult = await getUsersItemsData(User);

                expect(axiosMock.post).toHaveBeenCalledTimes(1);
                // expect(axiosMock.post).toHaveBeenCalledWith(import.meta.env.VITE_APP_API_URL, User, );
                
            });

            test('should return the correct data with successful POST call', async () => {
                const User = JSON.parse(localStorage.getItem(`user`));
                delete User['accessToken'];
                delete User['_id'];

                axiosMock.post.mockResolvedValueOnce({ data: { dbItems } });

                functionResult = await getUsersItemsData(User);
                
                expect(functionResult).toEqual(expect.objectContaining({
                    dbItems
                }));
            });

            test('should return an Error object with provided error message', async () => {
                const expectedReturn = new Error(`Test POST Error`);
                axiosMock.post.mockRejectedValueOnce(expectedReturn);
                functionResult = await getUsersItemsData();

                expect(functionResult.message).toBe(expectedReturn.message);
            });
        // });

    //     describe('Update todo tests', () => {

    //         const updatedTodo = { ...sampleTodos[3], todoCompleted: true };

    //         test('should call axios put with correct URL and data', async () => {

    //             functionResult = await submitTodoService(updatedTodo);

    //             expect(axiosMock.put).toHaveBeenCalledTimes(1);
    //             expect(axiosMock.put).toHaveBeenCalledWith(`${import.meta.env.VITE_TODOSURL}/${sampleTodos[3]._id}`, updatedTodo);
                
    //         });

    //         test('should return the correct data with successful PUT call', async () => {
    //             axiosMock.put.mockResolvedValueOnce({ data: updatedTodo });

    //             functionResult = await submitTodoService(updatedTodo);
                
    //             expect(functionResult.todo).toEqual(updatedTodo);
    //         });

    //         test('should return an Error object with provided error message', async () => {
    //             const expectedReturn = new Error(`Test PUT Error`);
    //             axiosMock.put.mockRejectedValueOnce(expectedReturn);
    //             functionResult = await submitTodoService(updatedTodo);

    //             expect(functionResult.message).toBe(expectedReturn.message);
            // });
        });
    });
});
