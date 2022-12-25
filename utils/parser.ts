import { FilterOperation } from "../generated/types";

export const parseJSON = (str: string): string | object => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
};

export const serialize = (obj: object, prefix: string): string => {
  let str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p as keyof typeof obj];
      str.push(
        v !== null && typeof v === "object"
          ? serialize(v, k)
          : encodeURIComponent(k) + "=" + encodeURIComponent(v)
      );
    }
  }
  return str.join("&");
};

export function filterByOperation<T>(
  operation: FilterOperation,
  data: T[],
  key: string,
  value: string
) {
  function assertOperation(
    operation: FilterOperation,
    data: T,
    value: string
  ): boolean {
    let item;

    const path = key.split(".");
    if (path.length > 1) {
      let iterator = data;
      for (let i = 0; i < path.length; i++)
        iterator = iterator[path[i] as keyof typeof item];

      item = iterator;
    } else item = data[key as keyof typeof data];

    switch (operation) {
      case "gt":
        return item > value;
      case "lt":
        return item < value;
      case "gte":
        return item >= value;
      case "lte":
        return item >= value;
      case "eq":
        return item == value;
      case "neq":
        return item != value;
      case "in":
        return (
          (!Array.isArray(item) && typeof item !== "string") ||
          item.includes(value)
        );
      case "nin":
        return (
          (!Array.isArray(item) && typeof item !== "string") ||
          !item.includes(value)
        );
      default:
        return false;
    }
  }

  return data.filter((item) => assertOperation(operation, item, value));
}
