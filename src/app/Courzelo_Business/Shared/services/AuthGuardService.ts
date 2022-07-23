import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { BusinessTokenStorageService } from './Business-token-storage.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private businessTokenStorage: BusinessTokenStorageService, public router: Router) {}
  canActivate(): boolean {
    console.log(this.businessTokenStorage.getToken())
    if (!this.businessTokenStorage.getToken()) {
      this.router.navigate(['/businessSpace/BusinessLogin']);
      alert('you need to be logged in to acces to that url')
      return false;
    }
    return true;
  }
}