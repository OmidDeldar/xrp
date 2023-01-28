import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type XrpDocument = XrpHistory & Document;

@Schema({ timestamps: true })
export class XrpHistory {

  @Prop({type: Object})
  data: Object;


}

export const XrpHistorySchema = SchemaFactory.createForClass(XrpHistory);