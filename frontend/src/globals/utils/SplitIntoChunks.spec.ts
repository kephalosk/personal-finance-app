import { splitIntoChunks } from './SplitIntoChunks';

describe('SplitIntoChunks', () => {
  it('splits an array into an array of chunks', () => {
    const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const testChunkSize = 3;

    const testChunks = splitIntoChunks(testArray, testChunkSize);

    expect(testChunks).toHaveLength(4);
    expect(testChunks.at(0)).toEqual([1, 2, 3]);
    expect(testChunks.at(1)).toEqual([4, 5, 6]);
    expect(testChunks.at(2)).toEqual([7, 8, 9]);
    expect(testChunks.at(3)).toEqual([10]);
  });
});
