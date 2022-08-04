import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-sub-account-dialog',
  templateUrl: './update-sub-account-dialog.component.html',
  styleUrls: ['./update-sub-account-dialog.component.css'],
})
export class UpdateSubAccountDialogComponent implements OnInit {
  firstForm!: FormGroup;
  verifMail = false;
  matcher = new MyErrorStateMatcher();
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  listRol: string[] = [];
  public account: any;
  theData: any;
  constructor(
    public dialogRef: MatDialogRef<UpdateSubAccountDialogComponent>,
    private fb: FormBuilder,
    private businessAuthService: BusinessAuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.account = this.data.message;
    this.firstForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        phone: [''],
        offerChk: [false],
        applicationChk: [false],
        testChk: [false],
        profileChk: [false],
      },
      { validators: this.checkPasswords }
    );
    this.SetField();
  }
  match(): boolean {
    this.firstForm.get('password')?.clearValidators();
    var pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return pattern.test(this.firstForm.get('password')?.value);
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  };
  ExistMail(email: string): boolean {
    if (email.length != 0) {
      this.businessAuthService.VerifMail(email).subscribe((res) => {
        this.verifMail = res;
      });
    }
    return this.verifMail;
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  SetField() {
    this.firstForm.get('firstName')?.setValue(this.account.firstName);
    this.firstForm.get('email')?.setValue(this.account.email);
    this.firstForm.get('lastName')?.setValue(this.account.lastName);
    this.firstForm.get('phone')?.setValue(this.account.phone);

    for (let i = 0; i < this.account.roles.length; i++) {
      if (this.account.roles[i].name == 'ROLE_OFFER_MANAGEMENT') {
        this.firstForm.get('offerChk')?.setValue(true);
      }
      if (this.account.roles[i].name == 'ROLE_TEST_MANAGMENT') {
        this.firstForm.get('testChk')?.setValue(true);
      }
      if (this.account.roles[i].name == 'ROLE_APPLICATION_MANAGEMENT') {
        this.firstForm.get('applicationChk')?.setValue(true);
      }
      if (this.account.roles[i].name == 'ROLE_ACCOUNT_MANAGEMENT') {
        this.firstForm.get('profileChk')?.setValue(true);
      }
    }
  }

  setData() {
    if (this.firstForm.get('offerChk')?.value == true)
      this.listRol.push('ROLE_OFFER_MANAGEMENT');
    if (this.firstForm.get('applicationChk')?.value == true)
      this.listRol.push('ROLE_APPLICATION_MANAGEMENT');
    if (this.firstForm.get('testChk')?.value == true)
      this.listRol.push('ROLE_TEST_MANAGMENT');
    if (this.firstForm.get('profileChk')?.value == true)
      this.listRol.push('ROLE_ACCOUNT_MANAGEMENT');

    this.data.message.email = this.firstForm.get('email')?.value;
    this.data.message.firstName = this.firstForm.get('firstName')?.value;
    this.data.message.lastName = this.firstForm.get('lastName')?.value;
    this.data.message.password = this.firstForm.get('password')?.value;
    this.data.message.phone = this.firstForm.get('phone')?.value;

  }
  updateAccount() {
    if (this.firstForm.invalid) {
      this.validateAllFormFields(this.firstForm);
    } else if (this.firstForm.valid) {
      if (this.data.message) {
        console.log(this.data.message)
        this.setData();
        this.businessAuthService
          .updateSubAccount(this.data.message.idBusiness,
            this.data.message.email,
            this.data.message.firstName ,
            this.data.message.lastName ,
            this.data.message.password ,
            this.data.message.phone ,
            this.listRol)
          .subscribe(
            (res) => {
              this.closeDialog();
              Swal.fire({
                title: 'Sub account updated successfully',
                icon: 'success',
                confirmButtonColor: '#07294d',
              });
            },
            (error) => {
              console.log(error);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! ' + error,
              });
            }
          );
      }
    }
  }
  closeDialog() {
    this.dialogRef.close(false);
  }

  Reset() {
    this.firstForm.reset();
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(
      control?.parent?.invalid && control?.parent?.dirty
    );

    return invalidCtrl || invalidParent;
  }
}
