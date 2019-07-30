import { get, isNil, omitBy } from '@/plugins/utils/lodash-exports';

const processSnapshot = (querySnapshot, query) =>
  querySnapshot.docs
    ? querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(doc => {
          for (let key in query) {
            if (
              query.hasOwnProperty(key) &&
              doc.hasOwnProperty(key) &&
              query.hasOwnProperty(key)
            ) {
              return !get(doc, key) === query[key];
            }
          }

          return true;
        })
    : querySnapshot.exists
    ? {
        id: querySnapshot.id,
        ...querySnapshot.data()
      }
    : {};

const mapInstanceToObject = obj => {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        obj[key] = obj[key].map(prop =>
          typeof prop === 'object' ? mapInstanceToObject(prop) : prop
        );
      } else if (typeof obj[key] === 'object' && !!obj[key]) {
        obj[key] = mapInstanceToObject(obj[key]);
      }
    }
  }

  return Object.assign({}, omitBy(obj, isNil));
};

export { mapInstanceToObject, processSnapshot };
