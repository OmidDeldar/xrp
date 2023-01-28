import { Module } from '@nestjs/common';
import { MongoModule } from "../mongo/mongo.module";
import { Connection } from "mongoose";
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryService } from './service/history.service';
import { XrpHistory, XrpHistorySchema } from './model/xrp.log.schema';


@Module({
  imports :[
    MongoModule.forRoot('127.0.0.1', 27017, 'xrp'),
    // MongooseModule.forRoot('mongodb://localhost/test')
  ] ,
  providers: [HistoryService ,
    {
        provide: 'XRP_LOG_MODEL',
        useFactory: (connection: Connection) =>
          connection.model(XrpHistory.name, XrpHistorySchema),
        inject: ['DATABASE_CONNECTION'],
      },

  ] ,
  exports :[HistoryService]
})
export class HistoryModule {}
