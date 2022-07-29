import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, PatternValidator, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { FileUpload } from '../../Shared/entities/FileUpload';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { FileUploadService } from '../../Shared/services/FileUpload.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-add-sub-account-dialog',
  templateUrl: './add-sub-account-dialog.component.html',
  styleUrls: ['./add-sub-account-dialog.component.css']
})
export class AddSubAccountDialogComponent implements OnInit {
  firstForm!: FormGroup;
  secondForm!: FormGroup;
  formJoin!:FormGroup;
  currentBusiness: any;
  
  verifMail=false;
  matcher = new MyErrorStateMatcher();
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  listRol:string[]=[];
  constructor(private uploadService:FileUploadService,private fb: FormBuilder,private businessAuthService: BusinessAuthService, private businesstokenStorage: BusinessTokenStorageService) { }

  
  ngOnInit(): void {
    this.currentBusiness = this.businesstokenStorage.getUser()
    // this.GetCountry();
    this.firstForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: [''],
     


    },
    { validators: this.checkPasswords }
    )

    this.secondForm = this.fb.group({
      offerChk: [false],
      applicationChk: [false],
      testChk: [false],
      profileChk: [false],
    },)


    this.formJoin=new FormGroup({form1:this.firstForm,form2:this.secondForm})
    
  }

  match():boolean{
    this.firstForm.get('password')?.clearValidators()
    var pattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(this.firstForm.get('password')?.value);
    
  }

  ExistMail(email:string):boolean{
    if(email.length!=0){
    this.businessAuthService.VerifMail(email).subscribe(res=>
      {
      this.verifMail=res;
      }
      )
    }
    return this.verifMail

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


  Send(){
    if(this.secondForm.get('offerChk')?.value==true)
    this.listRol.push("ROLE_OFFER_MANAGEMENT");
    if(this.secondForm.get('applicationChk')?.value==true)
    this.listRol.push("ROLE_APPLICATION_MANAGEMENT");
    if(this.secondForm.get('testChk')?.value==true)
    this.listRol.push("ROLE_TEST_MANAGMENT");
    if(this.secondForm.get('profileChk')?.value==true)
    this.listRol.push("ROLE_ACCOUNT_MANAGEMENT");

      this.businessAuthService.registerSubAccount(
      this.firstForm.get('email')?.value,
      this.firstForm.get('password')?.value,
      this.firstForm.get('firstName')?.value,
      this.firstForm.get('lastName')?.value,
      this.secondForm.get('phone')?.value,
      new Date(),
      this.currentBusiness.idBusiness,
      this.listRol
      ).subscribe(
        data => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;

          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error has accured !! ' +this.errorMessage,
            
          })

        }
      );
    
    
  }

  




checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
  let pass = group.get('password')?.value;
  let confirmPass = group.get('confirmPassword')?.value
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


