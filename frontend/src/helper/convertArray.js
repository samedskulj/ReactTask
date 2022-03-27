export const convertArray = (arr) => {
  const convertedObject = Object.assign(...arr, {});
  return convertedObject;
};
