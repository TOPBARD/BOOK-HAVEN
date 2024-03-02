import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BookDetails } from './book-details.schema';
import { BookSpecialCategory } from 'src/shared/emun/Book-special-Category';

@Schema({ timestamps: true })
export class Book {
  @Prop({ type: String })
  bookTitle: string;

  @Prop({ type: String })
  bookAuthor: string;

  @Prop({ type: String })
  bookCategory: string;

  @Prop({ type: String, default: BookSpecialCategory.RECOMMENDED })
  bookSpecialCategory: BookSpecialCategory;

  @Prop({ type: String })
  bookDescription: string;

  @Prop({ type: String })
  bookImageUrl: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'BookDetails' })
  bookDetails: BookDetails;
}

export type BookDocument = Book & Document;

export const BookSchema = SchemaFactory.createForClass(Book);
