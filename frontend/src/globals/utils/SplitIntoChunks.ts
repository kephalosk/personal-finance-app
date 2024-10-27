export function splitIntoChunks<Type>(array: Type[], chunkSize: number): Type[][] {
  const chunks: Type[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}
