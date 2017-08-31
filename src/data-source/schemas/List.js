/**
 * Created by eugenia on 01.05.17.
 */

import Realm from 'realm';

class List extends Realm.Object {}

List.schema = {
  name: 'List',
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
    description: 'string',
    createdAt: {
      type: 'date',
    },
    updatedAt: {
      type: 'date',
    },
  },
};

export default List;