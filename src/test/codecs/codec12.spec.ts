import { TeltonikaPacketsParser } from '@app/teltonika-packets-parser';

describe('Codec 12', () => {
  it('Send command test', () => {
    // Test
    // Sending command to device
    const codec12packet =
      '000000000000000F0C010500000007676574696E666F0100004312';
    const buff = Buffer.from(codec12packet, 'hex');
    const teltonikaPacketsParser = new TeltonikaPacketsParser(buff);
    console.log(teltonikaPacketsParser.tcpTeltonikaPacket);
    expect(teltonikaPacketsParser.tcpTeltonikaPacket).toBeDefined();
  });
  it('should parse codec 12 packet', () => {
    // Test
    // Getting back response from device
    const codec12FromDevicePacket =
      '00000000000000900C010600000088494E493A323031392F372F323220373A3232205254433A323031392F372F323220373A3533205253543A32204552523A312053523A302042523A302043463A302046473A3020464C3A302054553A302F302055543A3020534D533A30204E4F4750533A303A3330204750533A31205341543A302052533A332052463A36352053463A31204D443A30010000C78F';
    const buffer = Buffer.from(codec12FromDevicePacket, 'hex');
    const fromDeviceTeltonikaPacketsParser = new TeltonikaPacketsParser(buffer);
    console.log(fromDeviceTeltonikaPacketsParser.tcpTeltonikaPacket);
    expect(fromDeviceTeltonikaPacketsParser.tcpTeltonikaPacket).toBeDefined();
  });
});
