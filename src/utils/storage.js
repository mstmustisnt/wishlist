/**
 * Created by eugenia on 15.05.17.
 *
 * @flow
 * @providesModule AsyncStorageWrapper
 *
 */

import { AsyncStorage } from 'react-native';

class Storage {
  static async setItem(key: string, value: string): Promise {
    return AsyncStorage.setItem(key, value);
  }

  static async setMany(item: Object): Promise {
    return AsyncStorage.multiSet(Object.entries(item));
  }

  static async getItem(key: string):Promise<any> {
    return AsyncStorage.getItem(key);
  }

  static async getMany(keys: [string]): Promise<Array> {
    return AsyncStorage.multiGet(keys);
  }

  static async removeItem(key: string): Promise {
    return AsyncStorage.removeItem(key);
  }

  static async removeMany(keys: [string]): Promise {
    return AsyncStorage.multiRemove(keys);
  }

  static async clear(): Promise {
    return AsyncStorage.clear();
  }
}

export default Storage;