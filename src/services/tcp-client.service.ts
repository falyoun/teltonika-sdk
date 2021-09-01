import net from 'net';
import { OnModuleInit } from '@nestjs/common';

export class TcpClientService implements OnModuleInit {
  onModuleInit() {
    const client = new net.Socket();
    const host = '127.0.0.1';

    client.connect(+process.env.TCP_PORT, host, () => {
      console.log('Connected');
      client.write('Hello From Client ' + (client.address() as any).address);
    });

    client.on('data', (data) => {
      console.log('Received: ' + data);
      client.destroy();
    });

    client.on('close', () => {
      console.log('Connection closed');
    });
  }
}
