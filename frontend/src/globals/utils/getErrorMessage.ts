const getErrorMessage: <T>(error: T) => string = <T>(error: T): string => {
  return error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
    ? error.message
    : 'No further information available';
};

export default getErrorMessage;
