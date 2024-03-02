import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateBookDto {
  @IsString({ message: 'Title must be a string' })
  @MinLength(2, { message: 'Title must be at least 2 characters long' })
  @MaxLength(100, { message: 'Title cannot be longer than 100 characters' })
  title: string;

  @IsString({ message: 'Author must be a string' })
  @MinLength(2, { message: 'Author must be at least 2 characters long' })
  @MaxLength(100, { message: 'Author cannot be longer than 100 characters' })
  author: string;

  @IsString({ message: 'Category must be a string' })
  @MinLength(2, { message: 'Category must be at least 2 characters long' })
  @MaxLength(50, { message: 'Category cannot be longer than 50 characters' })
  category: string;

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
