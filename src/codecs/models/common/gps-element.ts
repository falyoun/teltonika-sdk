export class GpsElement {
  constructor(
    public longitude,
    public latitude,
    public altitude,
    public angle,
    public satellites,
    public speed,
  ) {}
  public static isLatValid(latitude: number) {
    return -90 <= latitude && latitude <= 90;
  }
  public static isLngValid(longitude: number) {
    return -180 <= longitude && longitude <= 180;
  }
}
