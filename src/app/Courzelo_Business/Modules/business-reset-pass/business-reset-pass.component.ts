import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import Swal from "sweetalert2";
import { ErrorStateMatcher } from '@angular/material/core';



@Component({
  selector: 'app-business-reset-pass',
  templateUrl: './business-reset-pass.component.html',
  styleUrls: ['./business-reset-pass.component.css']
})
export class BusinessResetPassComponent implements OnInit {

  hide = true;
  hideC = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  currentUser:any;
  Form!: FormGroup;
  matcher = new MyErrorStateMatcher();
  resetPasswordToken="";
  constructor(private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private businessAuthService: BusinessAuthService, private businesstokenStorage: BusinessTokenStorageService) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      params => {
        this.resetPasswordToken=params['token'];
      }
    )


    this.Form = this.fb.group({
      
      password: ['', Validators.required],
      Repassword: ['', Validators.required],
      
    },
    { validators: this.checkPasswords })

    if (this.businesstokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.businesstokenStorage.getUser().roles;
    }

    
  }


  onSubmit(){
    this.businessAuthService.resetPassword(this.Form.get("password")?.value,this.resetPasswordToken).subscribe(res=>
      {
        Swal.fire(
          'Done!',
          'your password has been reset ! You can go log in to your account',
          'success'
        ).then((result) => {
          if (result.isConfirmed){
            this.router.navigate(["/BusinessLogin"])
          }})
      })
  }


  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      //console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  match():boolean{
    this.Form.get('password')?.clearValidators()
    var pattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //console.log(pattern.test(this.firstForm.get('password')?.value))
    return pattern.test(this.Form.get('password')?.value);
    
  }


  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('Repassword')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}
