import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { Request } from 'express';
import { User } from 'src/user/schema/user.schema';

/**
 * The `AuthService` provides authentication and authorization services.
 *
 * @Injectable
 * @exports
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of `AuthService`.
   *
   * @constructor
   * @param {UserService} userService - The user service for interacting with user data.
   * @param {JwtService} jwtService - The JWT service for handling JSON Web Tokens.
   */
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Validates user credentials against stored user data.
   *
   * @param {string} email - The user's email address.
   * @param {string} password - The user's password.
   * @returns {Promise<User>} A promise that resolves with the validated user data.
   * @throws {UnauthorizedException} Throws an exception if credentials are invalid.
   */
  public async validateUser(email: string, password: string): Promise<User> {
    const lowerEmail = email.toLowerCase();
    console.log('Lower email', lowerEmail);
    const user = await this.userService.findOne(lowerEmail);
    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      throw new UnauthorizedException();
    }

    return user;
  }

  /**
   * Registers a new user.
   *
   * @param {RegisterUserDto} registerUserDto - The DTO containing user registration data.
   * @returns {Promise<User>} A promise that resolves when the user is successfully registered.
   */
  public async signUp(registerUserDto: RegisterUserDto): Promise<User> {
    return await this.userService.create(registerUserDto);
  }

  /**
   * Generates an access token for a user upon successful login.
   *
   * @param {LoginUserDto} loginUserDto - The DTO containing user login data.
   * @returns {Promise<{ access_token: string }>} A promise that resolves with the generated access token.
   */
  public async signIn(
    loginUserDto: LoginUserDto,
  ): Promise<{ access_token: string }> {
    const lowerEmail = loginUserDto.username.toLowerCase();
    const user = await this.userService.findOne(lowerEmail);
    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Extracts user information from a JWT token in the request headers.
   *
   * @param {Request} request - The HTTP request object.
   * @returns {Promise<User>} A promise that resolves with the extracted user information.
   * @throws {UnauthorizedException} Throws an exception if the token is invalid or not present.
   */
  public async extractUserFromToken(request: Request): Promise<User> {
    const headers = request.headers as { authorization?: string };

    if (!headers.authorization) {
      throw new UnauthorizedException('Authorization header not present');
    }

    const extractedToken = headers.authorization.split(' ')[1];

    try {
      const payload = await this.jwtService.verifyAsync(extractedToken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      if (!payload) {
        throw new UnauthorizedException('Invalid token');
      }

      return payload as User;
    } catch (error) {
      throw new UnauthorizedException('Error verifying token');
    }
  }
}
