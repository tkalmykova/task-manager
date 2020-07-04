import humps from 'humps';

export const camelize = (obj) => humps.camelizeKeys(obj);

export const decamelize = (obj) => {
  if (obj instanceof File || !(obj instanceof Object)) {
    return obj;
  }

  return Object.keys(obj).reduce(
    (acc, key) => ({
      ...acc,
      [humps.decamelize(key)]: decamelize(obj[key]),
    }),
    {},
  );
};
