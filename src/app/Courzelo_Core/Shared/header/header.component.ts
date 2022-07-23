import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../../Modules/Entity/user';
import { AuthService } from '../Service/auth.service';
import { TokenStorageService } from '../Service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentuser: any;
  isAdmin = false;
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService, private authService: AuthService) { }


  users: User[] | any;
  ngOnInit(): void {
    this.currentuser = this.tokenStorageService.getUser();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.currentuser.email = "java"){
      this.isAdmin = true;
    }
    // console.log(this.getUsers());

  }
  //*ngIf="!forAdmin()"
  forAdmin(): boolean{
    if(this.currentuser.displayName = "Admin")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();

  }

  public getUsers(): void {
    this.authService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchUsers(key: string): void {
    console.log(key);
    const results: User[] = [];
    for (const user of this.users) {
      if (user.displayName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getUsers();
    }
  }

}
