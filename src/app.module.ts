import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UdpClientService, UdpServerService } from '@app/services';
// import { TcpServerService } from '@app/services/tcp-server.service';
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
    // TcpServerService,
    UdpServerService,
    UdpClientService,
  ],
})
export class AppModule {}
