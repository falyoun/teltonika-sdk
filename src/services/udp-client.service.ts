import { OnModuleInit } from '@nestjs/common';
import udp from 'dgram';
export class UdpClientService implements OnModuleInit {
  onModuleInit() {
    // creating a client socket
    const client = udp.createSocket('udp4');
    //buffer msg
    const data = Buffer.from('MSG from UDP client');
    client.on('message', (msg, info) => {
      console.log('Data received from server : ' + msg.toString());
      console.log(
        'Received %d bytes from %s:%d\n',
        msg.length,
        info.address,
        info.port,
      );
    });

    //sending msg
    client.send(data, +process.env.TCP_PORT, 'localhost', (error) => {
      if (error) {
        console.log(error);
        client.close();
      } else {
        console.log('Data sent !!!');
      }
    });

    const data1 = Buffer.from('hello');
    const data2 = Buffer.from('world');

    //sending multiple msg
    client.send([data1, data2], +process.env.TCP_PORT, 'localhost', (error) => {
      if (error) {
        console.log(error);
        client.close();
      } else {
        console.log('Data sent !!!');
      }
    });

    setTimeout(() => {
      client.close();
    }, 20000);
  }
}
