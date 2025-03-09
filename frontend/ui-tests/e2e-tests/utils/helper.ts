export function getTestNameWithDate(): string {
  const tempDate: string = new Date().toString();
  const trimmedTempDate: string = tempDate.replace(/\s/g, '');
  const testName: string = `test${trimmedTempDate}`;
  const rawValue: string = removeInvalidCharacters(testName);
  return trimLength(rawValue);
}

function removeInvalidCharacters(name: string): string {
  return name.replace(/[^a-zA-Z0-9\s]/g, '');
}

function trimLength(value: string): string {
  if (value.length > 16) {
    return value.slice(0, 16);
  }
  return value;
}
