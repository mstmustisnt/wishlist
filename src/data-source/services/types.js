/* @flow */

export type QueryType = {
  q?: string,
  filter?: Object,
  orderBy?: string,
};

export type StorageOptionsType = {
  name: string,
  fields: Array<string>,
  qFields: Array<string>,
}