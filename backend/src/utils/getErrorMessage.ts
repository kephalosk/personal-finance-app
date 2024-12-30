const getErrorMessage: <T>(error: T) => string = <T>(error: T): string => {
  return error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
    ? error.message
    : 'no error message available';
};

export default getErrorMessage;
