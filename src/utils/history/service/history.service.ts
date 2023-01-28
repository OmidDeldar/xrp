import { Inject, Injectable } from "@nestjs/common";
import mongoose, { Model } from "mongoose";
import { XrpLogDto } from "../dtos/xrp-log.dto";
import { XrpHistory } from "../model/xrp.log.schema";


@Injectable()
export class HistoryService {
  constructor( @Inject('XRP_LOG_MODEL')
               private xrpLogModel: Model<XrpHistory>,
) {
  }
  async createXrpLog( xrpLogDto : XrpLogDto) {
    const history = new this.xrpLogModel(xrpLogDto);
    return await history.save();
  }
  
}
