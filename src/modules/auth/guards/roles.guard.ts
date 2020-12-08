import {
  CanActivate,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/modules/user/models/user.interface';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: User = request.user.user;

    return this.userService.findOne(user.id).pipe(
      map((user: User) => {
        const hasRole = () => {
          console.log(user);
          return requiredRoles.indexOf(user.role) > -1;
        };
        let hasPermission = false;

        if (hasRole()) {
          console.log('has role true');
          hasPermission = true;
        }

        return user && hasPermission;
      }),
    );
  }
}
