import udp from 'dgram';
import { TeltonikaPacketsParser } from '@app/teltonika-packets-parser';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UdpServerService {
  initiateServer() {
    const server = udp.createSocket('udp4');
    // Emits whenever an error occurs
    server.on('error', (error) => {
      console.error(error);
      server.close(() => {
        console.log('Server closed');
      });
    });

    //emits when socket is ready and listening for datagram msgs
    server.on('listening', () => {
      const address = server.address();
      const port = address.port;
      const family = address.family;
      const ipaddr = address.address;
      console.log('Server is listening at port: ' + port);
      console.log('Server ip: ' + ipaddr);
      console.log('Server is IP4/IP6: ' + family);
    });

    // Emits whenever datagram event occurs
    server.on('message', (msg, rinfo) => {
      const buff = Buffer.from(msg);
      console.log('Data received from client : ' + msg);
      console.log(
        'Received %d bytes from %s:%d\n',
        msg.length,
        rinfo.address,
        rinfo.port,
      );
      const parser = new TeltonikaPacketsParser(buff);
      parser.decodeUdpData();

      //sending msg
      server.send(msg, rinfo.port, 'localhost', function (error) {
        if (error) {
          console.log('Error in sending data from server: ', error);
        } else {
          console.log('Data sent from server !!!');
        }
      });
    });
    server.bind(+process.env.UDP_PORT, 'localhost');
  }
}
