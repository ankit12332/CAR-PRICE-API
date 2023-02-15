import { CanActivate } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces";

export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }
}