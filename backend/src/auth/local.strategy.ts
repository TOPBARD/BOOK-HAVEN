import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../../src/user/schema/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Validates user credentials using the local strategy.
   *
   * @param {string} username - The user's username.
   * @param {string} password - The user's password.
   * @returns {Promise<User>} A promise that resolves with the validated user data.
   * @throws {UnauthorizedException} Throws an exception if credentials are invalid.
   */
  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
