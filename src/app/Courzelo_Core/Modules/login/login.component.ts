import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Courzelo_Core/Shared/Service/auth.service';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { AppConstants } from '../../Shared/Common/app.constants';
import { UserManagementService } from '../../Shared/Service/user-management.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;
  token: string | any;
  error: string | any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private route: ActivatedRoute, private userService: UserManagementService, private routerr: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.error = this.route.snapshot.queryParamMap.get('error');
      if (this.tokenStorage.getToken()) {
        this.isLoggedIn = true;
        this.currentUser = this.tokenStorage.getUser();
      }
      else if(this.token){
        this.tokenStorage.saveToken(this.token);
        this.userService.getCurrentUser().subscribe(
              data => {
                this.login(data);
              },
              err => {
                this.form.data.controls['password'].setErrors({invalid: true});
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
              }
          );
      }
      else if(this.error){
        this.errorMessage = this.error;
        this.isLoginFailed = true;
      }
    }
  
    onSubmit(): void {
      this.authService.login(this.form).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.login(data.user);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
  
    login(user: any): void {
    this.tokenStorage.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();
    this.reloadPage();
    }

  reloadPage(): void {
    this.routerr.navigate(["/home"]) ;
  }
}
