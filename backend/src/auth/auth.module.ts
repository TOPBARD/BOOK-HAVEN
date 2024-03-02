import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtConfigModule } from '../shared/jwt/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

/**
 * The `AuthModule` encapsulates the authentication-related functionality
 * of the application, including user authentication and authorization.
 *
 * @module
 */
@Module({
  imports: [forwardRef(() => UserModule), JwtConfigModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
