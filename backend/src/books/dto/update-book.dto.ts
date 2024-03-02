import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { BookCategory } from '../../shared/emun/Book-category';

export class UpdateBookDto {
  @IsString({ message: 'Title must be a string' })
  @MinLength(2, { message: 'Title must be at least 2 characters long' })
  @MaxLength(100, { message: 'Title cannot be longer than 100 characters' })
  title: string;

  @IsString({ message: 'Author must be a string' })
  @MinLength(2, { message: 'Author must be at least 2 characters long' })
  @MaxLength(100, { message: 'Author cannot be longer than 100 characters' })
  author: string;

  @IsEnum({ message: 'Category must be a valid category' })
  category: BookCategory;

  @IsString({ message: 'Description must be a string' })
  @MinLength(10, { message: 'Description must be at least 10 characters long' })
  @MaxLength(1000, {
    message: 'Description cannot be longer than 1000 characters',
  })
  description: string;

  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  imageUrl?: string;
}
