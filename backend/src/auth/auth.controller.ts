import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LocalAuthGuard } from 'src/auth/guard/local-auth.guard';
import { User } from 'src/user/schema/user.schema';

/**
 * The `AuthController` handles authentication-related HTTP requests,
 * such as user registration and login.
 *
 * @controller
 * @exports
 */
@Controller('auth')
export class AuthController {
  /**
   * Creates an instance of `AuthController`.
   * @param {AuthService} authService - The authentication service.
   */
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles HTTP POST request for user registration.
   *
   * @param {RegisterUserDto} registerUserDto - The DTO containing user registration data.
   * @returns {Promise<User>} A promise that resolves with the result of user registration.
   */
  @Post('register')
  public async signUp(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    return await this.authService.signUp(registerUserDto);
  }

  /**
   * Handles HTTP POST request for user login.
   * Utilizes the local authentication guard for validating user credentials.
   *
   * @param {LoginUserDto} loginUserDto - The DTO containing user login data.
   * @returns {Promise<{ access_token: string }>} A promise that resolves with the result of user login.
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.signIn(loginUserDto);
  }
}
