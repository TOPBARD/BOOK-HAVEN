import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  /**
   * Checks if the user is authenticated by verifying the JWT token.
   *
   * @param {ExecutionContext} context - The execution context.
   * @returns {Promise<boolean>} A promise that resolves to true if the user is authenticated.
   * @throws {UnauthorizedException} Throws an exception if the user is not authenticated.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authorization header not present');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }

  /**
   * Extracts the JWT token from the Authorization header in the request.
   *
   * @param {Request} request - The HTTP request object.
   * @returns {string | undefined} The extracted JWT token or undefined if not present.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader || typeof authorizationHeader !== 'string') {
      return undefined;
    }

    const [type, token] = authorizationHeader.split(' ');

    return type === 'Bearer' && typeof token === 'string' ? token : undefined;
  }
}
