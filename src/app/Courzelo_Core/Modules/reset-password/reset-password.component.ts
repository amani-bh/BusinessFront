import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Courzelo_Core/Shared/Service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  resetPasswordToken: string | any;

  constructor(private authService: AuthService, private route: ActivatedRoute, private routerr: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.resetPasswordToken=params['token'];
      }
    )
  }

  onSubmit(): void {
    
    this.authService.resetPassword(this.form.password, this.resetPasswordToken).subscribe(
      data => {
        this.isSignUpFailed = false;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    this.reloadPage();
  }

  reloadPage(): void {
    this.routerr.navigate(["/home"]) ;
  }

}
