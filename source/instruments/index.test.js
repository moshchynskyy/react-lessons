// Core
import { sum, delay, getUniqueID, getFullApiUrl } from './';

jest.setTimeout(10000);

describe('test for instruments', () => {

    test('sum must be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum should throw, when it called with non-number type (2nd arg)', () => {
        expect( () => sum(2, 'halo!')).toThrow();
    });

    test('sum should throw, when it called with non-number type (1st arg)', () => {
        expect( () => sum('halooo', 5)).toThrow();
    });

    test('sum should return sum of 2 args', () => {
        expect(sum(2,7)).toBe(9);
        expect(sum(1,8)).toMatchSnapshot();
    });

    test('delay should return a resolved promise', async () => {
        await expect(delay()).resolves.toBe('A resolved promise :)');
    });

    test('GetUniqueID must be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('GetUniqueID should throw when it called with non-number arg', () => {
        expect( () => getUniqueID('hey, DJ!') ).toThrow();
    });

    test('GetUniqueID returns string and ...', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(16)).toHaveLength(16);
    });

    test('1st arg of getFullApiUrl must be a string', () => {
        expect( () => getFullApiUrl(11, 'halo!') ).toThrow();
    });

    test('2nd arg of getFullApiUrl must be a string', () => {
        expect( () => getFullApiUrl('halo!', 99) ).toThrow();
    });

    test('getFullApiUrl must return string', () => {
       expect(typeof getFullApiUrl('https:', '53tg32e')).toBe('string');
    });

});
