import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: `${process.env.JWT_SECRET_EXPIRY}` },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class JwtConfigModule {}
