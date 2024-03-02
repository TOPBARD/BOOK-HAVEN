import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BookDetails } from './book-details.schema';

@Schema({ timestamps: true })
export class Book {
  @Prop()
  bookTitle: string;

  @Prop()
  bookAuthor: string;

  @Prop()
  bookCategory: string;

  @Prop()
  bookSpecialCategory: string;

  @Prop()
  bookDescription: string;

  @Prop()
  bookImageUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'BookDetails' })
  bookDetails: BookDetails;
}

export const BookSchema = SchemaFactory.createForClass(Book);
