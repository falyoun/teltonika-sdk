import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { FmbParser } from './fmb-parser';
import { AvlRecord } from './models';
import { AvlPacket } from './models/avl-packet';


const testFmbParser = () => {
  let codec8packet = '000000000000004308020000016B40D57B480100000000000000000000000000000001010101000000000000016B40D5C198010000000000000000000000000000000101010101000000020000252C';

  const buff = Buffer.from(codec8packet, 'hex');
  const fmbParser = new FmbParser(buff);
  const avl: AvlPacket = fmbParser.avl;

  const avlPacket = new AvlPacket(
    avl.records,
    avl.zero,
    avl.data_length,
    avl.codec_id,
    avl.number_of_data,
    avl.number_of_data2,
    avl.CRC
  );
  // console.log(avlPacket);
  for (let i = 0; i < avl.records.length; i++) {
    const avlRecord: AvlRecord = avl.records[i];
    console.log(avlRecord)
    const avlInstance = new AvlRecord(
      avlRecord.priority,
      avlRecord.timestamp,
      avlRecord.gps,
      avlRecord.event_id,
      avlRecord.properties_count,
      avlRecord.ioElements
    )
     // avlInstance.print();
  }
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
    console.log('Server is up and running...');
    testFmbParser();
  } catch (e) {
    console.error(e);
  }
})();