import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtAuthPayload } from 'src/shared/interface/JwtAuthPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  /**
   * Validates and extracts user information from the JWT payload.
   *
   * @param {JwtAuthPayload} payload - The JWT payload containing user information.
   * @returns {Promise<JwtAuthPayload>} A promise that resolves with the extracted user information.
   */
  async validate(payload: JwtAuthPayload): Promise<JwtAuthPayload> {
    return {
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      isAdmin: payload.isAdmin,
    };
  }
}
