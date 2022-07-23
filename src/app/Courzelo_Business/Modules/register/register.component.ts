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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstForm!: FormGroup;
  secondForm!: FormGroup;
  formJoin!:FormGroup;
  
  imageUrl:FileUpload;
  imagePath:any;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  verifMail=false;
  verifName=false;
  matcher = new MyErrorStateMatcher();
  countries:any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private uploadService:FileUploadService,private fb: FormBuilder,private businessAuthService: BusinessAuthService, private businesstokenStorage: BusinessTokenStorageService) { }

  
  ngOnInit(): void {
 
    this.GetCountry();
    this.firstForm = this.fb.group({
     
      companyName: ['', Validators.required],
      website: [''],
      nbEmployees: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    { validators: this.checkPasswords }
    )
    console.log(this.firstForm)

    this.secondForm = this.fb.group({
     
      role: ['', Validators.required],
      phone: [''],
      physicalAddress: ['', Validators.required],
      country: ['', Validators.required],
      logo: [''],
      description: ['', Validators.required],
      industry: ['', Validators.required],
      checked: [false],
      
    },)


    this.formJoin=new FormGroup({form1:this.firstForm,form2:this.secondForm})
    //console.log(this.secondForm.get('checked')?.value)
    //this.ExistMail(this.firstForm.get('email')?.value)
    
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
   
      this.businessAuthService.register(
      this.firstForm.get('companyName')?.value,
      this.firstForm.get('email')?.value,
      this.firstForm.get('password')?.value,
      this.firstForm.get('website')?.value,
      this.firstForm.get('nbEmployees')?.value,
      this.firstForm.get('firstName')?.value,
      this.firstForm.get('lastName')?.value,
      this.secondForm.get('role')?.value,
      this.secondForm.get('phone')?.value,
      this.secondForm.get('industry')?.value,
      this.secondForm.get('country')?.value,
      this.secondForm.get('physicalAddress')?.value,
      this.secondForm.get('logo')?.value,
      this.secondForm.get('description')?.value,
      new Date(),
      
      ).subscribe(
        data => {
          console.log(data);
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

  GetCountry(){
    this.businessAuthService.GetCountries().subscribe(res=>{
      this.countries=res;
      //console.log(this.countries)
    })
    
  }

 

  async onFileChanged(event:any) {
  this.selectedFiles = event.target.files;
  this.upload()
  
}

   GetImage(){  
  if(this.imageUrl){this.secondForm.get('logo')?.setValue(this.imageUrl.url)}
  return this.imageUrl.url
}

upload(){
    const file = this.selectedFiles.item(0) as File;
    this.selectedFiles = undefined!;
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
      this.percentage = Math.round(percentage); 
      this.imageUrl=this.currentFileUpload
      
    },
      (error: any) => {
      console.log(error);
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

