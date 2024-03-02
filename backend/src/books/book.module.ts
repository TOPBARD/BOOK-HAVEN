import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schema/book.schema';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { JwtModule } from '@nestjs/jwt';
import { BookDetails, BookDetailsSchema } from './schema/book-details.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: BookDetails.name, schema: BookDetailsSchema },
    ]),
    JwtModule,
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
