import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Shared/Service/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  registerToken: string | any;

  constructor(private authService: AuthService, private route: ActivatedRoute, private routerr: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.registerToken=params['token'];
      }
    )
  }

  onSubmit(): void {
    
    this.authService.confirmEmail(this.registerToken).subscribe(
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
