export interface GprsCodecInterface {
  sendCommand: (command: string) => void;
  getDeviceResponse: () => void;
}
