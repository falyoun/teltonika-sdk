import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  TcpClientService,
  UdpClientService,
  UdpServerService,
} from '@app/services';
import { TcpServerService } from '@app/services/tcp-server.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MongooseModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (cg: ConfigService) => ({
    //     uri: cg.get('MONGO_URI'),
    //     retryAttempts: 1,
    //   }),
    // }),
  ],
  controllers: [],
  providers: [
    TcpServerService,
    TcpClientService,
    UdpServerService,
    UdpClientService,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly tcpServerService: TcpServerService,
    private readonly tcpClientService: TcpClientService,
    private readonly udpServerService: UdpServerService,
    private readonly udpClientService: UdpClientService,
  ) {}
  onModuleInit() {
    this.tcpServerService.initiateServer();
  }
}
