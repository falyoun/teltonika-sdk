

export interface GprsCodecInterface {
  sendCommand: () => void;
  getDeviceResponse: () => void;
}