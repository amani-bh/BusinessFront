import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import * as Mydata from '../../../../assets/CourzeloBusiness/json/industry.json'

import Swal from "sweetalert2";


@Component({
  selector: 'app-upd-job-dialog',
  templateUrl: './upd-job-dialog.component.html',
  styleUrls: ['./upd-job-dialog.component.css']
})
export class UpdJobDialogComponent implements OnInit {

  subIndustries:any
  theData:any;
  countries:any
  Form!: FormGroup;
  jobOffers!: JobOffers[];
  public dataSource= new  MatTableDataSource<JobOffers>();
  constructor(public dialogRef: MatDialogRef<UpdJobDialogComponent>,private JobsService:JobOffersService,@Inject(MAT_DIALOG_DATA) public data: any,private fb: FormBuilder) 
  { }

  ngOnInit(): void {

    this.theData=Mydata;
    this.Getjobs();
    this.Form = this.fb.group({
      idJob : ['', Validators.required],
      title : ['', Validators.required],
      description: ['', Validators.required],
      creationDate: ['', ],
      startDate: ['', Validators.required],
      deadlineDate: ['', Validators.required],
      state: ['', Validators.required],
      jobType: ['', Validators.required],
      locationType: ['', Validators.required],
      schedulesType:['', Validators.required],
      industry: ['', Validators.required],
      subIndustry:['', Validators.required],
      location: [''],
      country: [''],
      requirement: ['', Validators.required],
      hireNumber: ['', Validators.required],
      salaryOption: ['', ],
      salaryRangeMin:[],
      salaryRangeMax:[],
      salaryStartAmout:[],
      salary: ['', ],
      salaryCurrency:[],
      communication:[false],
      communicationMails:[],
      jobBenefits:[],
      idBusiness:[]
    })

    this.setField();
    
    this.GetCountry();

  }

  
  setField(){
    
    console.log(this.data.message)
    this.Form.get("idJob")?.setValue(this.data.message.idJob);
    this.Form.get("title")?.setValue(this.data.message.title);
    this.Form.get("description")?.setValue(this.data.message.description);
    this.Form.get("creationDate")?.setValue(this.data.message.creationDate);
    this.Form.get("startDate")?.setValue(this.data.message.startDate);
    this.Form.get("deadlineDate")?.setValue(this.data.message.deadlineDate);
    this.Form.get("state")?.setValue(this.data.message.state);
    this.Form.get("jobType")?.setValue(this.data.message.jobType);
    this.Form.get("locationType")?.setValue(this.data.message.locationType);
    this.Form.get("location")?.setValue(this.data.message.location);
    this.Form.get("country")?.setValue(this.data.message.country);
    
    this.Form.get("requirement")?.setValue(this.data.message.requirement);
    this.Form.get("requirement")?.setValue(this.Form.get("requirement")?.value.toString());
    
    this.Form.get("hireNumber")?.setValue(this.data.message.hireNumber);
    this.Form.get("salary")?.setValue(this.data.message.salary);
    this.Form.get("industry")?.setValue(this.data.message.industry);
    
    
   
    this.onChange(this.data.message.industry)
    
      this.Form.get("subIndustry")?.setValue(this.data.message.subIndustry);
  
    this.Form.get("schedulesType")?.setValue(this.data.message.schedulesType);
    this.Form.get("salaryOption")?.setValue(this.data.message.salaryOption);
    this.Form.get("salaryRangeMax")?.setValue(this.data.message.salaryRangeMax);
    this.Form.get("salaryRangeMin")?.setValue(this.data.message.salaryRangeMin);
    this.Form.get("salaryStartAmout")?.setValue(this.data.message.salaryStartAmout);
    this.Form.get("salaryCurrency")?.setValue(this.data.message.salaryCurrency);
    this.Form.get("communication")?.setValue(this.data.message.communication);

    this.Form.get("communicationMails")?.setValue(this.data.message.communicationMails);
    if(this.Form.get("communicationMails")?.value){
      this.Form.get("communicationMails")?.setValue(this.Form.get("communicationMails")?.value.toString());}

    this.Form.get("jobBenefits")?.setValue(this.data.message.jobBenefits);
    this.Form.get("idBusiness")?.setValue(this.data.message.idBusiness);
    

    console.log(this.Form.value)
  }


   
  setData(){
    
    
    this.data.message.idJob=this.Form.get("idJob")?.value;
    this.data.message.title=this.Form.get("title")?.value;
    this.data.message.description=this.Form.get("description")?.value;
    this.data.message.creationDate=this.Form.get("creationDate")?.value;
    this.data.message.startDate=this.Form.get("startDate")?.value;
    this.data.message.deadlineDate=this.Form.get("deadlineDate")?.value;
    this.data.message.state=this.Form.get("state")?.value;
    this.data.message.jobType=this.Form.get("jobType")?.value;
    this.data.message.locationType=this.Form.get("locationType")?.value;
    this.data.message.location=this.Form.get("location")?.value;
    this.data.message.country=this.Form.get("country")?.value;
    this.data.message.requirement=this.Form.get("requirement")?.value.split(',');
    this.data.message.hireNumber=this.Form.get("hireNumber")?.value;
    this.data.message.salary=this.Form.get("salary")?.value;
    this.data.message.industry=this.Form.get("industry")?.value;
    this.data.message.subIndustry=this.Form.get("subIndustry")?.value;
    this.data.message.schedulesType=this.Form.get("schedulesType")?.value;
    this.data.message.salaryOption=this.Form.get("salaryOption")?.value;
    this.data.message.salaryRangeMax=this.Form.get("salaryRangeMax")?.value;
    this.data.message.salaryRangeMin=this.Form.get("salaryRangeMin")?.value;
    this.data.message.salaryStartAmout=this.Form.get("salaryStartAmout")?.value;
    this.data.message.salaryCurrency=this.Form.get("salaryCurrency")?.value;
    this.data.message.communication=this.Form.get("communication")?.value;

    this.data.message.industry=this.Form.get("communication")?.value;

    if(this.Form.get("communicationMails")?.value){
    this.data.message.communicationMails=this.Form.get("communicationMails")?.value.split(',');
    }
    this.data.message.jobBenefits=this.Form.get("jobBenefits")?.value;
    this.data.message.idBusiness=this.Form.get("idBusiness")?.value;
   
  }


  
  checkJobLocation(){
    if(this.Form.get('locationType')?.value=="on site" || this.Form.get('locationType')?.value=="mixed")
    {
      return true ; 
    
    }
    else return false;
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


  updatejob() {

    if(this.Form.invalid){
      this.validateAllFormFields(this.Form);
    }
    else if(this.Form.valid){
     if (this.data.message) 
     {
        //var id=this.data.message.idJob;
        //console.log(id);
       // this.setData();
        //console.log(this.data.message);
        this.setData();
        //console.log(this.data.message);
        this.JobsService.Put(this.data.message.idJob,this.data.message).subscribe((res) => {
          this.closeDialog()
          //this.toastr.success("Job offer updated ! ")
          Swal.fire({
            title: 'Job offers updated successfully',
            icon:'success',
            confirmButtonColor: '#07294d'
             })
          
         
        }, (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! ' + error,
            
          })
      
     } )
    }
  }
  }
  
  
  

  Getjobs(){
    
    this.JobsService.GetAlldJobs().subscribe(data=>{this.jobOffers=data;
     this.dataSource.data = this.jobOffers as JobOffers[];
       },err=>{
      console.log(err);
    })}



 


  closeDialog() {
    this.dialogRef.close(false);
   
  }

  
  Reset() {
    this.Form.reset(); 
}

public hasError = (controlName: string, errorName: string) =>{
  this.Form.controls[controlName].markAllAsTouched();
  return this.Form.controls[controlName].hasError(errorName);
}

GetCountry(){
  this.JobsService.GetCountries().subscribe(res=>{
    this.countries=res;
    
  })
  
}

onChange(val:any){
  
  
  
  for(let i =0; i<this.theData.industries.length;i++)
  {
    if(this.theData.industries.at(i).industry.industryName==val)
    {
      this.subIndustries=this.theData.industries.at(i).subIndustries;  
    }
    
  }  
}


onChangeSub(val:any){
  this.onChange(this.data.message.industry)
  this.data.message.subIndustry=val;
  
}


}

