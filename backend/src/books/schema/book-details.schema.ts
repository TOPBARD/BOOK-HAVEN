import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class BookDetails {
  @Prop({ type: Number })
  bookPrice: number;

  @Prop({ type: Number })
  bookQuantity: number;

  @Prop({ type: Boolean, default: true })
  isPresentInStore: boolean;
}

export const BookDetailsSchema = SchemaFactory.createForClass(BookDetails);
