import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CandidateApp } from '../../Shared/entities/CandidateApp';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import Swal from "sweetalert2";
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import * as Mydata from '../../../../assets/CourzeloBusiness/json/industry.json'

@Component({
  selector: 'app-job-overview',
  templateUrl: './job-overview.component.html',
  styleUrls: ['./job-overview.component.css']
})
export class JobOverviewComponent implements OnInit {
  idJob:any;
  currentJob!:JobOffers;
  countries:any;
  subIndustries:any
  theData:any;

  edit=false;
  isCheched=false;
  candidateApps!: CandidateApp[];
  public dataSource2= new  MatTableDataSource<CandidateApp>();
  displayedColumns2 = ['applicationDate','candidateState','Job'];
  Form!: FormGroup;
  constructor(private fb: FormBuilder,private _Activatedroute:ActivatedRoute,private JobsService:JobOffersService,private candidateAppService:CandidateAppService) { }

  
  ngOnInit(): void {
    this.idJob=this._Activatedroute.parent?.snapshot.paramMap.get('idJob');
    this.theData=Mydata;


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
      country: ['', Validators.required],
      location: [''],
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

    /*Set fields ennabled*/
    for (var control in this.Form.controls) {
      if((control!='title') )
      this.Form.controls[control].disable();
      this.Form.controls['state'].enable();
}


    this.GetJobByid(this.idJob)
    this.GetCountry();
    
    
    
  }


  setField(){
    
    console.log(this.currentJob);
    this.Form.get("idJob")?.setValue(this.currentJob.idJob);
    this.Form.get("title")?.setValue(this.currentJob.title);
    this.Form.get("description")?.setValue(this.currentJob.description);
    this.Form.get("creationDate")?.setValue(this.currentJob.creationDate);
    this.Form.get("startDate")?.setValue(this.currentJob.startDate);
    this.Form.get("deadlineDate")?.setValue(this.currentJob.deadlineDate);
    this.Form.get("state")?.setValue(this.currentJob.state);
    this.Form.get("jobType")?.setValue(this.currentJob.jobType);
    this.Form.get("locationType")?.setValue(this.currentJob.locationType);
    this.Form.get("location")?.setValue(this.currentJob.location);
    this.Form.get("country")?.setValue(this.currentJob.country);
    this.Form.get("requirement")?.setValue(this.currentJob.requirement);
    this.Form.get("requirement")?.setValue(this.Form.get("requirement")?.value.toString());
    this.Form.get("hireNumber")?.setValue(this.currentJob.hireNumber);
    this.Form.get("salary")?.setValue(this.currentJob.salary);
    this.Form.get("industry")?.setValue(this.currentJob.industry);
    this.onChange(this.currentJob.industry)
    this.Form.get("subIndustry")?.setValue(this.currentJob.subIndustry);
    this.Form.get("schedulesType")?.setValue(this.currentJob.schedulesType);
    this.Form.get("salaryOption")?.setValue(this.currentJob.salaryOption);
    this.Form.get("salaryRangeMax")?.setValue(this.currentJob.salaryRangeMax);
    this.Form.get("salaryRangeMin")?.setValue(this.currentJob.salaryRangeMin);
    this.Form.get("salaryStartAmout")?.setValue(this.currentJob.salaryStartAmout);
    this.Form.get("salaryCurrency")?.setValue(this.currentJob.salaryCurrency);
    this.Form.get("communication")?.setValue(this.currentJob.communication);

    this.Form.get("communicationMails")?.setValue(this.currentJob.communicationMails);
    if(this.Form.get("communicationMails")?.value){
      this.Form.get("communicationMails")?.setValue(this.Form.get("communicationMails")?.value.toString());}
    this.Form.get("jobBenefits")?.setValue(this.currentJob.jobBenefits);
    this.Form.get("idBusiness")?.setValue(this.currentJob.business.idBusiness);
    

    
   
  }


   
  setData(){
    if(this.Form.get("communicationMails")?.value){
      this.Form.get("communicationMails")?.setValue(this.Form.get("communicationMails")?.value.split(','));
    }
  }

  GetJobByid(id:any){
    this.JobsService.GetJobById(id).subscribe(res=>{
      this.currentJob=res;
      this.setField();
    })
  }

GetCandidateByJob(id:any){
  this.candidateAppService.GetApplicationByJob(id).subscribe(res=>
    {
      this.candidateApps=res;
      this.dataSource2.data = this.candidateApps as CandidateApp[];
    })
}


updatejob(Form:any) {

  if(Form.invalid){
    this.validateAllFormFields(this.Form);
  }
  else if(Form.valid){
   if (Form.value) 
   {
    if(Form.get("communicationMails")?.value){
      Form.get("communicationMails")?.setValue(Form.get("communicationMails")?.value.split(','));
    }
      Form.get("requirement")?.setValue(Form.get("requirement")?.value.split(','));
      this.JobsService.Put(this.idJob,Form.value).subscribe((res) => {
        Form.get("communicationMails")?.setValue(Form.get("communicationMails")?.value);
        Form.get("requirement")?.setValue(Form.get("requirement")?.value.toString());
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



UpdateTitle(){
  this.currentJob.title=this.Form.get('title')?.value;
  this.JobsService.Put(this.idJob,this.currentJob).subscribe(res=>
    {
      console.log(res)
    })
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



public hasError = (controlName: string, errorName: string) =>{
  this.Form.controls[controlName].markAllAsTouched();
  return this.Form.controls[controlName].hasError(errorName);
}


public toggle(event: MatSlideToggleChange) {
  if(event.checked==true){
    Object.keys(this.Form.controls).forEach(key => {
      this.Form.controls[key].enable();
    });
    this.isCheched=true
  }
  else if(event.checked==false){
    this.updatejob(this.Form)
    Object.keys(this.Form.controls).forEach(key => {
         this.Form.controls[key].disable();
         this.Form.controls['title'].enable();
         this.Form.controls[('state')].enable();    
    }); 
    this.isCheched=false
  }
  
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

onChangeStatus(val:any){
  this.currentJob.state=this.Form.get('state')?.value;
  this.JobsService.Put(this.idJob,this.currentJob).subscribe(res=>
    {
      console.log(res)
    })
}

}
