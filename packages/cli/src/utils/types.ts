export type Filepath = string;
export type EntityName = string;

export type RefLocation = {
  filepath: Filepath;
  refValue: string;
  originalValue: string;
  jsonpath: string;
};
