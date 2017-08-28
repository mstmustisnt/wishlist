/**
 * Created by eugenia on 30.05.17.
 *
 * @providesModule cachingUtil
 */

import { Image } from 'react-native';
import { Asset } from 'expo';

export async function cacheImages(images) {
  const awaits = await Promise.all(images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  }));

  return awaits;
}