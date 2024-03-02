import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../../user/schema/user.schema';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Accessing the user from the request object
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;

    // Check if the user is an admin
    if (user && user.isAdmin) {
      return true;
    }

    // If not an admin, deny access
    throw new UnauthorizedException('User is not admin');
  }
}
