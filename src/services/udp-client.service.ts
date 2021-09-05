import { OnModuleInit } from '@nestjs/common';
import udp from 'dgram';
export class UdpClientService implements OnModuleInit {
  onModuleInit() {
    // creating a client socket
    const client = udp.createSocket('udp4');
    // buffer msg
    const codec8packet =
      '003DCAFE0105000F33353230393330383634303336353508010000016B4F815B30010000000000000000000000000000000103021503010101425DBC000001';
    const buff = Buffer.from(codec8packet, 'hex');
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
    client.send(buff, +process.env.UDP_PORT, 'localhost', (error) => {
      if (error) {
        console.log(error);
        client.close();
      } else {
        console.log('Data sent from client !!!');
      }
    });

    // const data1 = Buffer.from('hello');
    // const data2 = Buffer.from('world');
    //
    // // Sending multiple msg
    // client.send([data1, data2], +process.env.UDP_PORT, 'localhost', (error) => {
    //   if (error) {
    //     console.log(error);
    //     client.close();
    //   } else {
    //     console.log('Data sent !!!');
    //   }
    // });

    setTimeout(() => {
      client.close();
    }, 20000);
  }
}
