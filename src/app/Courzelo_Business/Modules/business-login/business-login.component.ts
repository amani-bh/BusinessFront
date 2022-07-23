import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import Swal from "sweetalert2";



@Component({
  selector: 'app-business-login',
  templateUrl: './business-login.component.html',
  styleUrls: ['./business-login.component.css']
})
export class BusinessLoginComponent implements OnInit {
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
      email: ['', Validators.required],
      password: ['', Validators.required],
      
    })

    if (this.businesstokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.businesstokenStorage.getUser().roles;
    }

    
  }


  
  onSubmit(): void {
   

    
    this.businessAuthService.login(this.Form.get("email")?.value, this.Form.get("password")?.value).subscribe(
      data => {
        this.businesstokenStorage.saveToken(data.accessToken);
        this.businesstokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.businesstokenStorage.getUser().roles;
        this.currentUser = this.businesstokenStorage.getUser();
        console.log(this.currentUser)
        this.reloadPage();
      },
      err => {
        //this.errorMessage = err.error.message;
       // this.isLoginFailed = true;
        if(this.isLoggedIn==false){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'verify you email and password !! ',
            
          })
        }
      }
    );


  }

  reloadPage(): void {
    
    window.location.reload();
    //window.location.reload("/homepage");
    this.router.navigate(["/CourzeloForBusiness"]).then(onfulfilled => window.location.reload()) ;
    
  }

public hasError = (controlName: string, errorName: string) =>{
  
  return this.Form.controls[controlName].invalid ;
}






}
