import { CanActivate, ExecutionContext } from "@nestjs/common";

export class AdminGuard implements CanActivate{
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest();
        if(!request.currentUser){
            return false;
        }
        // if(request.CurrentUser.isAdmin){
        //     return true;
        // }else{
        //     return false;
        // }
        //////////////////////// OR /////////////////////
        return request.currentUser.isAdmin;
    }
}