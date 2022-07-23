import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import Swal from "sweetalert2";


@Component({
  selector: 'app-business-forgot-pass',
  templateUrl: './business-forgot-pass.component.html',
  styleUrls: ['./business-forgot-pass.component.css']
})
export class BusinessForgotPassComponent implements OnInit {

  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  currentUser:any;
  Form!: FormGroup;
  constructor(private fb: FormBuilder,private router: Router,private businessAuthService: BusinessAuthService, private businesstokenStorage: BusinessTokenStorageService) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      email: ['', Validators.required]
    })

    if (this.businesstokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.businesstokenStorage.getUser().roles;
    }

    
  }


  onSubmit(){

    Swal.fire({
      title:'Reset password',
      text:'You sure you want to reset your password?',
      icon:'question',
      confirmButtonColor: '#07294d',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      confirmButtonText: 'Sure',
    }).then((result) => {
      if (result.isConfirmed){
      this.businessAuthService.forgetPassword(this.Form.get('email')?.value).subscribe(res=>
        {
          Swal.fire(
            'Done!',
            'Please check your mail ! we have send you a link to reset you password',
            'success'
          )
        },
        
      err => {
     console.log(err)
     Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!' + err,
      
    })
  }
      ) }
        
      })
  }
}
