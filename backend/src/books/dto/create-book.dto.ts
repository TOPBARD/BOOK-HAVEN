import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsNumber,
  ValidateNested,
  MinLength,
  MaxLength,
} from 'class-validator';
import { BookSpecialCategory } from '../../shared/emun/Book-special-Category';
import { BookCategory } from '../../../src/shared/emun/Book-category';

class BookDetailsDto {
  @IsNotEmpty({ message: 'Book price cannot be empty' })
  @IsNumber({}, { message: 'Book price must be a number' })
  bookPrice: number;

  @IsNotEmpty({ message: 'Book quantity cannot be empty' })
  @IsNumber({}, { message: 'Book quantity must be a number' })
  bookQuantity: number;
}

export class CreateBookDto {
  @IsNotEmpty({ message: 'Book title cannot be empty' })
  @IsString({ message: 'Book title must be a string' })
  @MinLength(2, { message: 'Book title must be at least 2 characters long' })
  @MaxLength(100, {
    message: 'Book title cannot be longer than 100 characters',
  })
  bookTitle: string;

  @IsNotEmpty({ message: 'Book author cannot be empty' })
  @IsString({ message: 'Book author must be a string' })
  bookAuthor: string;

  @IsNotEmpty({ message: 'Book category cannot be empty' })
  @IsEnum({ message: 'Invalid Book Category' })
  bookCategory: BookCategory;

  @IsOptional()
  @IsEnum(BookSpecialCategory, { message: 'Invalid special category' })
  bookSpecialCategory?: BookSpecialCategory;

  @IsNotEmpty({ message: 'Book description cannot be empty' })
  @IsString({ message: 'Book description must be a string' })
  @MinLength(10, {
    message: 'Book description must be at least 10 characters long',
  })
  @MaxLength(1000, {
    message: 'Book description cannot be longer than 1000 characters',
  })
  bookDescription: string;

  @IsNotEmpty({ message: 'Book image URL cannot be empty' })
  @IsString({ message: 'Book image URL must be a string' })
  bookImageUrl: string;

  @IsNotEmpty({ message: 'Book details cannot be empty' })
  @ValidateNested({ message: 'Invalid book details' })
  @Type(() => BookDetailsDto)
  bookDetails: BookDetailsDto;
}
