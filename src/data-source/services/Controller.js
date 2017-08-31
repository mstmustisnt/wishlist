/**
 *
 * @flow
 * Created by eugenia on 01.05.17.
 */

import db from '../db';
import { StorageOptionsType, QueryType } from './types';
import QueryBuilder from './QueryBuilder';

export default class Controller {
  constructor(options: StorageOptionsType) {
    Object.assign(this, options);
    this.queryBuilder = new QueryBuilder({ fields: options.fields, qFields: options.qFields });
    this.find = this.find.bind(this);
    this.findOne = this.findOne.bind(this);
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
  }

  findOne(query: Object = {}) {
    const results = this.find(query);

    return results && results[0];
  }

  find(query: QueryType = {}) {
    const rawQuery = this.queryBuilder.build(query);

    let results = db.objects(this.name);

    if (rawQuery) {
      console.debug(`Querying DB with "${rawQuery}"`);
      results = results.filtered(rawQuery);
    }

    if (query.orderBy) {
      return results.sorted(query.orderBy) || [];
    }

    return results;
  }

  create(data: Object) {
    const results = db.objects(this.name);
    let lastId = 1;

    if (results.length) {
      lastId = (Math.max(...results.map(item => item.id)) || 0) + 1;
    }

    data.id = lastId;

    return db.write(() => {
      db.create(this.name, data);
      console.log(results);
    });
  }

  update(data: Object) {
    return db.write(() => {
      return db.create(this.name, data, true);
    });
  }

  remove(id) {
    const object = this.find({ filter: { id } });

    return db.write(() => {
      return db.delete(object);
    });
  }
}