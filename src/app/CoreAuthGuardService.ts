import { Injectable } from '@angular/core';
import { Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TokenStorageService } from './Courzelo_Core/Shared/Service/token-storage.service';

@Injectable()
export class CoreAuthGuardService implements CanActivate {
  path:any
  constructor(private tokenStorageService: TokenStorageService, public router: Router) {
    
  }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    console.log(state.url)
    console.log(this.tokenStorageService.getToken())
    if (!this.tokenStorageService.getToken()) {
      alert('you need to be logged in to acces to that url')
      this.router.navigate(['/login'] ,{ queryParams: { returnUrl: state.url }})
      return false;
    }
    return true;
  }
}