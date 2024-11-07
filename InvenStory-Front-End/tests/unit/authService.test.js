import axiosMock from "axios";
import { login, signUp, logout } from "../../src/service/auth.service";

import getTestUser from "../data/testUsers";
const { dbUsers, Users, newUser } = await getTestUser();

import { afterEach, beforeEach } from "vitest";

vi.mock('axios');

describe('Authentication Services Tests', () => {
   
    let functionResult;   
    
    afterEach(() => {
        vi.resetAllMocks();
    });

    describe('Login service test', () => {
    
        describe('Normal Data Returned', () => {

            const expectedReturn = { data: dbUsers[0], status: 200, accessToken: 420 }

            beforeEach(async () => {
                axiosMock.post.mockResolvedValueOnce(expectedReturn);
                functionResult = await login();
            });

            test('should call axios.get once with supplied URL', async () => {
                expect(axiosMock.post).toHaveBeenCalledTimes(1);
            });

            test('should return sample items when valid data is returned from server', async () => {
                expect(functionResult).toEqual(dbUsers[0]);
            });
        });

        describe('EmptyArray Returned', () => {
           
            test('should return nothing', async () => {
                const expectedReturn = { data: [], status: 200 };
                axiosMock.post.mockResolvedValueOnce(expectedReturn);
                functionResult = await login();

                expect(functionResult.message).toEqual(undefined);
            });
        });

        describe('Error Returned', () => {
           
            test('should return an Error object with provided error message', async () => {
                const expectedReturn = new Error(`Test GET Error`);
                axiosMock.post.mockRejectedValueOnce(expectedReturn);
                functionResult = await login();

                expect(functionResult.message).toBe(expectedReturn.message);
            });
        });

        describe('Local Storage Test', () => {

            const expectedReturn = { data: { date: dbUsers[0], accessToken: 420}, status: 200 }

            beforeEach(async () => {
                axiosMock.post.mockResolvedValueOnce(expectedReturn);
                functionResult = await login();
            });

            test('should create a `user` item in local storage', async () => {
                expect(localStorage.getItem(`user`)).not.toEqual(null);
            });
        });
    });
    describe('SignUp service test', () => {
    
        describe('Normal Data Returned', () => {

            const expectedReturn = { data: dbUsers[0], status: 200 }

            beforeEach(async () => {
                axiosMock.post.mockResolvedValueOnce(expectedReturn);
                functionResult = await signUp();
            });

            test('should call axios.post once with supplied URL', async () => {
                expect(axiosMock.post).toHaveBeenCalledTimes(1);
            });

            test('should return sample items when valid data is returned from server', async () => {
                expect(functionResult).toEqual(dbUsers[0]);
            });
        });

        describe('EmptyArray Returned', () => {
           
            test('should return nothing', async () => {
                const expectedReturn = { data: [], status: 200 };
                axiosMock.post.mockResolvedValueOnce(expectedReturn);
                functionResult = await signUp();

                expect(functionResult.message).toEqual(undefined);
            });
        });

        describe('Error Returned', () => {
           
            test('should return an Error object with provided error message', async () => {
                const expectedReturn = new Error(`Test POST Error`);
                axiosMock.post.mockRejectedValueOnce(expectedReturn);
                functionResult = await signUp();

                expect(functionResult.message).toBe(expectedReturn.message);
            });
        });
    });

    describe('Logout service test', () => {

        beforeEach(async () => {
            localStorage.setItem(`user`, JSON.stringify(newUser));
        });

        test('should remove local storage user', async () => {
            localStorage.setItem(`user`, JSON.stringify(newUser));
            logout();
            expect(localStorage.getItem(`user`)).toEqual(null);
        });
    });
});
