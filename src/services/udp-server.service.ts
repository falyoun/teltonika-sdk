import udp from 'dgram';
import { OnModuleInit } from '@nestjs/common';
export class UdpServerService implements OnModuleInit {
  async onModuleInit() {
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
      console.log('Server is listening at port' + port);
      console.log('Server ip :' + ipaddr);
      console.log('Server is IP4/IP6 : ' + family);
    });

    // Emits whenever datagram event occurs
    server.on('message', (msg, rinfo) => {
      console.log('Data received from client : ' + msg.toString());
      console.log(
        'Received %d bytes from %s:%d\n',
        msg.length,
        rinfo.address,
        rinfo.port,
      );

      //sending msg
      server.send(msg, rinfo.port, 'localhost', function (error) {
        if (error) {
          // client.close();
        } else {
          console.log('Data sent from server !!!');
        }
      });
    });
    server.bind(+process.env.TCP_PORT);
  }
}
