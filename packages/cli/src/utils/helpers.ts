type JsonObj = Record<string, unknown>;

/**
 * Traverses the properties of the potentially nested objects and any arrays therein.
 * When encountering a primitive datatype, it calls the callback function
 * with the closest object or array containing the primitive value.
 */
export const traverseJson = (
  obj: JsonObj | unknown[],
  fnOnPrimitive: (directParentObj: JsonObj, key: string, val: unknown) => void
) => {
  Object.entries(obj).forEach(([key, val]) => {
    if (typeof val === 'object' && val !== null) {
      return traverseJson(val as JsonObj, fnOnPrimitive);
    }
    if (Array.isArray(val)) {
      return traverseJson(val, fnOnPrimitive);
    }
    return fnOnPrimitive(obj as JsonObj, key, val);
  });
};
