import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { FmbParser } from './fmb-parser';
import { AvlRecord, AvlPacket} from './models';


const testCodec8 = () => {
  let codec8packet = '000000000000004308020000016B40D57B480100000000000000000000000000000001010101000000000000016B40D5C198010000000000000000000000000000000101010101000000020000252C';

  const buff = Buffer.from(codec8packet, 'hex');
  const fmbParser = new FmbParser(buff);
  const avl: AvlPacket = fmbParser.avl;

  // const avlPacket = new AvlPacket(
  //   avl.records,
  //   avl.zero,
  //   avl.data_length,
  //   avl.codec_id,
  //   avl.number_of_data,
  //   avl.number_of_data2,
  //   avl.CRC
  // );
  // console.log(avlPacket);
  for (let i = 0; i < avl.records.length; i++) {
    const avlRecord: AvlRecord = avl.records[i];
    console.log(avlRecord)
    // const avlInstance = new AvlRecord(
    //   avlRecord.priority,
    //   avlRecord.timestamp,
    //   avlRecord.gps,
    //   avlRecord.event_id,
    //   avlRecord.properties_count,
    //   avlRecord.ioElements
    // )
     // avlInstance.print();
  }
}


const testCodec12 = () => {

  // Test
  // Sending command to device
  let codec12packet = '000000000000000F0C010500000007676574696E666F0100004312';
  const buff = Buffer.from(codec12packet, 'hex');
  const fmbParser = new FmbParser(buff);
  console.log(fmbParser.avl)

  // Test
  // Getting back response from device
  let codec12FromDevicePacket = '00000000000000900C010600000088494E493A323031392F372F323220373A3232205254433A323031392F372F323220373A3533205253543A32204552523A312053523A302042523A302043463A302046473A3020464C3A302054553A302F302055543A3020534D533A30204E4F4750533A303A3330204750533A31205341543A302052533A332052463A36352053463A31204D443A30010000C78F'
  const buffer = Buffer.from(codec12FromDevicePacket, 'hex');
  const fromDeviceFmbParser = new FmbParser(buffer);
  console.log(fromDeviceFmbParser.avl)

};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('port');
  await app.listen(port);
}

(async () => {
  try {
    await bootstrap();
    console.log('Server is up and running...');
    testCodec8();
    testCodec12();
  } catch (e) {
    console.error(e);
  }
})();
