import { IsNotEmpty, IsArray } from 'class-validator';
import { CartItem } from '../../../src/shared/interface/CartItem';

export class CartDetailsDto {
  @IsArray()
  @IsNotEmpty()
  cart: CartItem[];
}
