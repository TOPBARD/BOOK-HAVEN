import { IsNotEmpty, IsArray } from 'class-validator';
import { CartItem } from '../../shared/interface/CartItem';

export class CartDetailsDto {
  @IsArray()
  @IsNotEmpty()
  cart: CartItem[];
}
