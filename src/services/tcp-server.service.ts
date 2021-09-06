import { Injectable } from '@nestjs/common';
import net from 'net';
import { TeltonikaPacketsParser } from '@app/teltonika-packets-parser';

@Injectable()
export class TcpServerService {
  initiateServer(): net.Server {
    const port = +process.env.TCP_PORT;
    const tcpServer = net.createServer((socket) => {
      socket
        .on('connect', () => {
          console.log('Tcp server connected successfully.!');
        })
        .on('error', (err: Error) => {
          console.error('Tcp server error: ', err);
        })
        .on('data', (data) => {
          const codec8packet =
            '000000000000002808010000016B40D9AD80010000000000000000000000000000000103021503010101425E100000010000F22A';
          const buff = Buffer.from(codec8packet, 'hex');
          console.log('Data in server received: ', data);
          const parser = new TeltonikaPacketsParser(data);
          const r = parser.decodeTcpData();
          // console.log(r);
          // console.log(parser.tcpTeltonikaPacket);
        });
    });

    tcpServer.listen(port, () => {
      console.log('opened server on', tcpServer.address());
    });

    const client = net.createConnection({ port }, () => {
      // 'connect' listener.
      console.log('connected to server!');
      const codec8packet =
        '000000000000002808010000016B40D9AD80010000000000000000000000000000000103021503010101425E100000010000F22A';
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
}
