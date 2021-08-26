import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TeltonikaPacketsParser } from './teltonika-packets-parser';
import { Codec14 } from '@app/codecs';

const testCodec8 = () => {
  let codec8packet =
    '000000000000004308020000016B40D57B480100000000000000000000000000000001010101000000000000016B40D5C198010000000000000000000000000000000101010101000000020000252C';
  const buff = Buffer.from(codec8packet, 'hex');
  const teltonikaPacketsParser = new TeltonikaPacketsParser(buff);
  console.log(teltonikaPacketsParser.tcpTeltonikaPacket);
};

const testCodec16 = () => {
  const codec16Packet =
    '000000000000005F10020000016BDBC7833000000000000000000000000000000000000B05040200010000030002000B00270042563A00000000016BDBC7871800000000000000000000000000000000000B05040200010000030002000B00260042563A00000200005FB3';
  const buff = Buffer.from(codec16Packet, 'hex');
  const parser = new TeltonikaPacketsParser(buff);
  console.log(parser.tcpTeltonikaPacket);
};

const testCodec12 = () => {
  // Test
  // Sending command to device
  let codec12packet = '000000000000000F0C010500000007676574696E666F0100004312';
  const buff = Buffer.from(codec12packet, 'hex');
  const teltonikaPacketsParser = new TeltonikaPacketsParser(buff);
  console.log(teltonikaPacketsParser.tcpTeltonikaPacket);

  // Test
  // Getting back response from device
  let codec12FromDevicePacket =
    '00000000000000900C010600000088494E493A323031392F372F323220373A3232205254433A323031392F372F323220373A3533205253543A32204552523A312053523A302042523A302043463A302046473A3020464C3A302054553A302F302055543A3020534D533A30204E4F4750533A303A3330204750533A31205341543A302052533A332052463A36352053463A31204D443A30010000C78F';
  const buffer = Buffer.from(codec12FromDevicePacket, 'hex');
  const fromDeviceTeltonikaPacketsParser = new TeltonikaPacketsParser(buffer);
  console.log(fromDeviceTeltonikaPacketsParser.tcpTeltonikaPacket);
};

const testCodec13 = () => {
  let codec13packet =
    '00000000000000170D0105000000070A81C320676574696E666F0100006855';
  const buff = Buffer.from(codec13packet, 'hex');
  const teltonikaPacketsParser = new TeltonikaPacketsParser(buff);
  console.log(teltonikaPacketsParser.tcpTeltonikaPacket);
};
const testCodec14 = () => {
  let codec14packet =
    '00000000000000100E011100000008035209308145246801000032AC';
  const buff = Buffer.from(codec14packet, 'hex');
  const teltonikaPacketParser = new TeltonikaPacketsParser(buff);
  const codec = teltonikaPacketParser.codec as Codec14;
  codec.sendCommand();
  codec.getDeviceResponse();

  console.log(teltonikaPacketParser.tcpTeltonikaPacket);
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('port');
  await app.listen(port);
}
const dashLine = () =>
  console.log(
    '---------------------------------------------------------------------------------------------------',
  );

(async () => {
  try {
    await bootstrap();
    console.log('Server is up and running...');
    dashLine();
    console.log('Codec 8');
    dashLine();
    testCodec8();
    dashLine();
    console.log('Codec 16');
    dashLine();
    testCodec16();
    dashLine();
    console.log('Codec 12');
    dashLine();
    testCodec12();
    console.log('Codec 13');
    dashLine();
    testCodec13();
    console.log('Codec 14');
    dashLine();
    testCodec14();
  } catch (e) {
    console.error(e);
  }
})();
