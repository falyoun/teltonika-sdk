import { GpsElement } from '@app/codecs';

export const sanitizeLongLat = (
  gpsElement: GpsElement,
  gpsPrecision = 10000000,
) => sanitizeGPS({ gps: { ...gpsElement } }, gpsPrecision);
export const sanitizeGPS = (avlRecord, gpsPrecision = 10000000) => {
  try {
    const longitude: number = avlRecord.gps.longitude;
    const latitude: number = avlRecord.gps.latitude;
    if ('0' == longitude.toString(2).substr(0, 1)) {
      avlRecord.gps.longitude *= -1;
    }
    avlRecord.gps.longitude /= gpsPrecision;
    if ('0' == latitude.toString(2).substr(0, 1)) {
      avlRecord.gps.latitude *= -1;
    }
    avlRecord.gps.latitude /= gpsPrecision;
    return avlRecord;
  } catch (e) {
    console.error('sanitizeGPS: ', e);
    return avlRecord;
  }
};

export const prepareIOEntity = (property_id, value, ioElements: any) => {
  const label = ioElements[property_id] ? ioElements[property_id].label : '';
  const dimension = ioElements[property_id]
    ? ioElements[property_id].dimension
    : '';
  const valueHuman = ioElements[property_id]
    ? ioElements[property_id].values
      ? ioElements[property_id].values[value]
      : ''
    : '';
  return {
    id: property_id,
    value,
    label,
    dimension,
    valueHuman,
  };
};
