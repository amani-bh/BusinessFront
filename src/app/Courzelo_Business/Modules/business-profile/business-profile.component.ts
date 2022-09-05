import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { isThisQuarter } from 'date-fns';
import { Business } from '../../Shared/entities/Business';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import Swal from 'sweetalert2';
import { UpdateSubAccountDialogComponent } from '../update-sub-account-dialog/update-sub-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-business-profile',
  templateUrl: './business-profile.component.html',
  styleUrls: ['./business-profile.component.css']
})
export class BusinessProfileComponent implements OnInit {
  currentBusiness:any;
  user!:any;
  subAccounts!: Business[];
  hide:boolean=false;
  
  firstForm!: FormGroup;
  verifMail=false;
  verifName=false;
  matcher = new MyErrorStateMatcher();
  countries:any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

 
  constructor(private fb: FormBuilder,private businessTokenStorage: BusinessTokenStorageService,private businessAuthService: BusinessAuthService,private router: Router,private _liveAnnouncer: LiveAnnouncer,private diag: MatDialog,) { }

  ngOnInit(): void {
    if (this.businessTokenStorage.getToken()) {
     
      this.currentBusiness = this.businessTokenStorage.getUser();
      this.businessAuthService.GetUserById(this.businessTokenStorage.getUser().idBusiness).subscribe(data=>{
        this.user=data;
        this.SetField();
      },
      (err) => {
        console.log(err);
      })
    }
    this.getAllSubAccount();
    this.GetCountry();
    this.firstForm = this.fb.group({
      companyName: ['', Validators.required],
      website: [''],
      nbEmployees: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
      confirmPassword: [''],
      role: ['', Validators.required],
      phone: [''],
      physicalAddress: ['', Validators.required],
      country: ['', Validators.required],
      logo: [''],
      description: ['', Validators.required],
      industry: ['', Validators.required],
    },
    { validators: this.checkPasswords }
    
    )
    
  }

  getAllSubAccount() {
    this.businessAuthService
      .GetAllSubAccount(this.businessTokenStorage.getUser().idBusiness)
      .subscribe(
        (data) => {
          this.subAccounts = data;
        },
        (err) => {
          console.log(err);
        }
      );
  }
 
setVisible(){
  this.hide=!this.hide;
}
Update(msg: any) {
    const newMsg = Object.assign({}, msg);
    const diagref = this.diag.open(UpdateSubAccountDialogComponent, {
      width: '650px',
      height: 'auto',
      data:
      {
        message: newMsg,
      }
    })
      .afterClosed().subscribe((res => {
        this.getAllSubAccount();
      }));;


}
DeleteAccount(id: String) {
  Swal.fire({
    title: 'Are u sure ?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    confirmButtonColor: '#07294d',
    cancelButtonColor: '#d33',
    showCancelButton: true,
    confirmButtonText: 'Sure',
  }).then((result) => {
    if (result.isConfirmed) {
      this.businessAuthService.Delete(id).subscribe(result => {
        this.getAllSubAccount();
        Swal.fire({
          title: 'Sub Account deleted successfully',
          icon: 'success',
          confirmButtonColor: '#07294d'
        })
      },
        err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! ' + err,

          })
        });
        this.getAllSubAccount();
    }
  })




}
checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
  let pass = group.get('password')?.value;
  let confirmPass = group.get('confirmPassword')?.value
  return pass === confirmPass ? null : { notSame: true }
}
match():boolean{
  this.firstForm.get('password')?.clearValidators()
  var pattern =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //console.log(pattern.test(this.firstForm.get('password')?.value))
  return pattern.test(this.firstForm.get('password')?.value);
  
}

ExistMail(email:string):boolean{
  if(email.length!=0){
  this.businessAuthService.VerifMail(email).subscribe(res=>
    {
    this.verifMail=res;
    //console.log(res)
    }
    )
  }
  return this.verifMail

}
ExistCompany(name:string){
  if(name.length!=0){
  this.businessAuthService.VerifName(name).subscribe(res=>
    {
    this.verifName=res
    console.log(res)
    }
    )
  }

    return this.verifName
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
   
  this.businessAuthService.update(
    this.user.idBusiness,
  this.firstForm.get('companyName')?.value,
  this.firstForm.get('email')?.value,
  this.firstForm.get('password')?.value,
  this.firstForm.get('website')?.value,
  this.firstForm.get('nbEmployees')?.value,
  this.firstForm.get('firstName')?.value,
  this.firstForm.get('lastName')?.value,
  this.firstForm.get('role')?.value,
  this.firstForm.get('phone')?.value,
  this.firstForm.get('industry')?.value,
  this.firstForm.get('country')?.value,
  this.firstForm.get('physicalAddress')?.value,
  this.firstForm.get('description')?.value,
  
  ).subscribe(
    data => {
      this.isSuccessful = true;
      this.isSignUpFailed = false;
      Swal.fire({
        title: 'Account updated successfully',
        icon: 'success',
        confirmButtonColor: '#07294d'
      })
      this.businessAuthService.GetUserById(this.businessTokenStorage.getUser().idBusiness).subscribe(data=>{
        this.user=data;
      },
      (err) => {
        console.log(err);
      })

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

GetCountry(){
this.businessAuthService.GetCountries().subscribe(res=>{
  this.countries=res;
})
}
SetField() {
  this.firstForm.get('firstName')?.setValue(this.user?.firstName);
  this.firstForm.get('email')?.setValue(this.user?.email);
  this.firstForm.get('lastName')?.setValue(this.user?.lastName);
  this.firstForm.get('companyName')?.setValue(this.user?.companyName);
  this.firstForm.get('physicalAddress')?.setValue(this.user?.address);
  this.firstForm.get('country')?.setValue(this.user?.country);
  this.firstForm.get('description')?.setValue(this.user?.description);
  this.firstForm.get('industry')?.setValue(this.user?.industry);
  this.firstForm.get('website')?.setValue(this.user?.website);
  this.firstForm.get('phone')?.setValue(this.user?.phone);
  this.firstForm.get('nbEmployees')?.setValue(this.user?.nbEmployee);
  this.firstForm.get('role')?.setValue(this.user?.recrutementRole);

}


}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}