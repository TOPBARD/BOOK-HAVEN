import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CartDetailsDto } from './dto/CartDetails.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrderService) {}
  @Post('checkout')
  public async checkoutCart(@Body() CartDetailsDto: CartDetailsDto) {
    return await this.orderService.checkoutCart(CartDetailsDto.cart);
  }
}
