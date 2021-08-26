import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';
import * as net from 'net';
import { TeltonikaPacketsParser } from '@app/teltonika-packets-parser';
const tcpServer = () => {
  const port = 7433;
  const tcpServer = net.createServer((socket) => {
    socket
      .on('connect', () => {
        console.log('Tcp server connected successfully.!');
      })
      .on('error', (err: Error) => {
        console.error('Tcp server error: ', err);
      })
      .on('data', (data) => {
        let codec8packet =
          '000000000000004308020000016B40D57B480100000000000000000000000000000001010101000000000000016B40D5C198010000000000000000000000000000000101010101000000020000252C';
        const buff = Buffer.from(codec8packet, 'hex');
        console.log('Data in server received: ', data);
        console.log(buff);
        const parser = new TeltonikaPacketsParser(data);
        console.log(parser.tcpTeltonikaPacket);
      });
  });

  tcpServer.listen(port, () => {
    console.log('opened server on', tcpServer.address());
  });

  const client = net.createConnection({ port }, () => {
    // 'connect' listener.
    console.log('connected to server!');
    let codec8packet =
      '000000000000004308020000016B40D57B480100000000000000000000000000000001010101000000000000016B40D5C198010000000000000000000000000000000101010101000000020000252C';
    const buff = Buffer.from(codec8packet, 'hex');
    client.write(buff);
  });
  client.on('end', () => {
    console.log('disconnected from server');
  });
  client.on('data', (data) => {
    console.log('Received data in client: ', data);
    // client.end();
  });
  return tcpServer;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: 'TcpServerService',
      useFactory: () => {
        return tcpServer();
      },
    },
  ],
})
export class AppModule {}
