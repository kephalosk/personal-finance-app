export function toLowerCaseWithoutWhitespace(category: string): string {
  const lowerCase = category.toLowerCase();
  return lowerCase.replaceAll(' ', '');
}
