export const getErrorData = (error: any): string => {
  try {
    return JSON.parse(error.message);
  } catch {
    return error.message;
  }
};
