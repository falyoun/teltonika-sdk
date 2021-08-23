export class GpsElement {
  x: number;
  y: number;
  altitude: number;
  angle: number;
  satellites: number;
  speed: number;
  public static isLatValid(latitude: number) {
    return -90 <= latitude && latitude <= 90;
  }
  public static isLngValid(longitude: number) {
    return -180 <= longitude && longitude <= 180;
  }
}