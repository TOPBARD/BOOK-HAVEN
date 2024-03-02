import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { SubscribeUserDto } from './dto/subscribe-user.dto';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * Retrieves user data for the authenticated user.
   * @param req - The request object containing user information from the JWT token.
   * @returns User data.
   */
  @Get('me')
  public async getUserData(@Req() request: Request) {
    return await this.userService.getUserData(request);
  }

  /**
   * Subscribes a user to the newsletter.
   * @param subscribeDto - The data for subscribing a user to the newsletter.
   * @returns The result of the subscription process.
   */
  @Post('subscribe')
  public async subscribeToNewsletter(@Body() subscribeDto: SubscribeUserDto) {
    return await this.userService.subscribeToNewsletter(subscribeDto.email);
  }
}
