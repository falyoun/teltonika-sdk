import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { TeltonikaPacketsParser } from './teltonika-packets-parser';

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
  let codec14packet = '00000000000000AB0E0106000000A303520930814522515665723A30332E31382E31345F3034204750533A41584E5F352E31305F333333332048773A464D42313230204D6F643A313520494D45493A33353230393330383134353232353120496E69743A323031382D31312D323220373A313320557074696D653A3137323334204D41433A363042444430303136323631205350433A312830292041584C3A30204F42443A3020424C3A312E362042543A340100007AAE';
  const buff = Buffer.from(codec14packet, 'hex');
  const teltonikaPacketParser = new TeltonikaPacketsParser(buff);
  console.log(teltonikaPacketParser.tcpTeltonikaPacket)
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('port');
  await app.listen(port);
}

(async () => {
  try {
    await bootstrap();
    // console.log('Server is up and running...');
    // console.log(
    //   '---------------------------------------------------------------------------------------------------',
    // );
    // console.log('Codec 8');
    // console.log(
    //   '---------------------------------------------------------------------------------------------------',
    // );
    // testCodec8();
    // console.log(
    //   '---------------------------------------------------------------------------------------------------',
    // );
    // console.log('Codec 16');
    // console.log(
    //   '---------------------------------------------------------------------------------------------------',
    // );
    // testCodec16();
    // console.log(
    //   '---------------------------------------------------------------------------------------------------',
    // );
    // console.log('Codec 12');
    // console.log(
    //   '---------------------------------------------------------------------------------------------------',
    // );
    // testCodec12();
    // console.log('Codec 13');
    // console.log(
    //   '---------------------------------------------------------------------------------------------------',
    // );
    // testCodec13();
    // console.log('Codec 14');
    // console.log(
    //   '---------------------------------------------------------------------------------------------------',
    // );
    // testCodec14();
  } catch (e) {
    console.error(e);
  }
})();
