type JsonObj = Record<string, unknown>;

/**
 * Traverses the properties of the potentially nested objects and any arrays therein.
 * When encountering a primitive datatype, it calls the callback function
 * with the closest object or array containing the primitive value.
 */
export const traverseJson = (
  obj: JsonObj | unknown[],
  fnOnPrimitive: (
    directParentObj: JsonObj,
    key: string,
    val: unknown,
    jsonPath: string
  ) => void,
  jsonpath = ''
) => {
  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === 'object' && val !== null) {
      return traverseJson(val as JsonObj, fnOnPrimitive, `${jsonpath}.${key}`);
    }
    if (Array.isArray(val)) {
      return traverseJson(val, fnOnPrimitive, `${jsonpath}.${key}`);
    }
    return fnOnPrimitive(obj as JsonObj, key, val, `${jsonpath}.${key}`);
  });
};
