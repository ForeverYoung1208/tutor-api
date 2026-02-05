import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenViduService } from './openvidu.service';

@Module({
  imports: [ConfigModule],
  providers: [OpenViduService],
  exports: [OpenViduService],
})
export class OpenViduModule {}
