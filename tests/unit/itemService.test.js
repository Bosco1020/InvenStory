import axiosMock from "axios";
import { getAllItemsData, getUsersItemsData } from "../../src/service/items.service";
import getTestItems from "../data/testItems";
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
    // describe('submitTodoService tests', () => {
    //     describe('POST a new todo tests', () => {
    //         const testSubmittedTodo = {
    //             todoDescription: `New Test Todo`,
    //             todoDateCreated: new Date().toUTCString(),
    //             todoCompleted: false
    //         }
            
    //         const test_id = generateTodoId();

    //         test('should call axios post with correct URL and data', async () => {

    //             functionResult = await submitTodoService(testSubmittedTodo);

    //             expect(axiosMock.post).toHaveBeenCalledTimes(1);
    //             expect(axiosMock.post).toHaveBeenCalledWith(import.meta.env.VITE_TODOSURL, testSubmittedTodo);
                
    //         });

    //         test('should return the correct data with successful POST call', async () => {
    //             axiosMock.post.mockResolvedValueOnce({ data: { ...testSubmittedTodo, _id: test_id } });

    //             functionResult = await submitTodoService(testSubmittedTodo);
                
    //             expect(functionResult.todo).toEqual(expect.objectContaining({
    //                 ...testSubmittedTodo,
    //                 _id: test_id
    //             }));
    //         });

    //         test('should return an Error object with provided error message', async () => {
    //             const expectedReturn = new Error(`Test POST Error`);
    //             axiosMock.post.mockRejectedValueOnce(expectedReturn);
    //             functionResult = await submitTodoService();

    //             expect(functionResult.message).toBe(expectedReturn.message);
    //         });
    //     });

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
    //         });
    //     });
    // });
});
