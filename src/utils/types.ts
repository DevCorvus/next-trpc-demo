export type ConvertDatesToStrings<T> = {
  [k in keyof T]: T[k] extends Date ? string : T[k];
};
