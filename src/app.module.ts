import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XrpModule } from './xrp-ledger/xrp.module';

@Module({
  imports: [XrpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
