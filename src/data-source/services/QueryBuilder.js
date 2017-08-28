/* @flow */

import { QueryType } from './types';

export default class QueryBuilder {
  get operatorsMap(): Object {
    return {
      $gt: '>',
      $gte: '>=',
      $lt: '<',
      $lte: '<=',
      $eq: '==',
      $ne: '!=', // not equal
      $ci: '[c]', // case insensitive
      $contains: 'CONTAINS',
      $beginsWith: 'BEGINSWITH',
      $endsWith: 'ENDSWITH',
      $and: 'AND',
      $or: 'OR',
    }
  };

  fields: Array<string>;
  qFields: Array<string>;

  constructor({ fields = [], qFields = [] }) {
    Object.assign(this, { fields, qFields });
  }

  buildQSearch(string: string): string {
    // TODO: support different types (begins with, ends with, contains)
    let queryString = '';
    const qFieldsLength = this.qFields.length;
    this.qFields.forEach((field, index) => {
      const isLast = index === (qFieldsLength - 1);
      const or = isLast ? '' : ' OR ';

      // TODO: will it work with numbers?
      return queryString += `${field} ${this.operatorsMap.$contains}${this.operatorsMap.$ci} "${string}"${or}`;
    });

    return queryString;
  }

  buildFilteredQuery(filter): string {
    let queryString = '';
    let counter = 1;
    let filtersCount = Object.keys(filter).length;

    for (let name in filter) {
      if (filter.hasOwnProperty(name)) {
        if (!(filter[name] === Object(filter[name]))) {
          // it's not an object
          queryString += ` ${name} ${this.operatorsMap.$eq} ${filter[name]} `;
        } else {

          if (this.operatorsMap[name]) {
            queryString += ` ${this.operatorsMap[name]} "${filter[name]}" `;
          }

          queryString += ` ${this.operatorsMap.$and} ${name} ${this.buildFilteredQuery(filter[name])}`;

          // TODO: support nested objects querying
        }

        if (counter < filtersCount) {
          queryString += ` ${this.operatorsMap.$and} `;
        }
      }

      counter += 1;
    }

    return queryString;
  }

  build(query: QueryType): string {
    let queryString = '';

    if (query.q) {
      // q-search
      queryString += this.buildQSearch(query.q);
    }

    if (query.filter) {
      if (queryString.length > 0) {
        queryString += ` ${this.operatorsMap.$and} `;
      }

      queryString += this.buildFilteredQuery(query.filter);
    }

    return queryString;
  }

}