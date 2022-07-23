import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { JobOffersService } from '../../Shared/services/JobOffers.service';


import * as Mydata from '../../../../assets/CourzeloBusiness/json/industry.json'


import Swal from "sweetalert2";
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';

@Component({
  selector: 'app-add-job-dialog',
  templateUrl: './add-job-dialog.component.html',
  styleUrls: ['./add-job-dialog.component.css']
})
export class AddJobDialogComponent implements OnInit {


  subIndustries: any
  data: any;
  countries: any;
  Form!: FormGroup;
  jobOffers!: JobOffers[];
  currentBusiness: any;
  public dataSource = new MatTableDataSource<JobOffers>();
  constructor(public dialogRef: MatDialogRef<AddJobDialogComponent>, private JobsService: JobOffersService, private fb: FormBuilder, private businessAuthService: BusinessAuthService, private businesstokenStorage: BusinessTokenStorageService) { }

  ngOnInit(): void {
    this.data = Mydata;
    this.currentBusiness = this.businesstokenStorage.getUser()
    this.Getjobs();
    this.GetCountry();

    this.Form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      deadlineDate: ['', Validators.required],
      creationDate: ['', Validators.required],
      state: ['', Validators.required],
      jobType: ['', Validators.required],
      schedulesType: ['', Validators.required],
      industry: ['', Validators.required],
      subIdustry: ['', Validators.required],
      country: ['', Validators.required],
      locationType: ['', Validators.required],
      location: [''],
      requirement: ['', Validators.required],
      hireNumber: ['', Validators.required],
      salaryOption: ['',],
      salaryRangeMin: [],
      salaryRangeMax: [],
      salaryStartAmout: [],
      salary: ['',],
      salaryCurrency: [],
      communication: [false],
      communicationMails: [],
      jobBenefits: [],
     
    })

    this.Form.get('startDate')?.setValue((new Date()));
    this.Form.get('creationDate')?.setValue((new Date()));

  }


  checkJobLocation() {
    if (this.Form.get('locationType')?.value == "on site" || this.Form.get('locationType')?.value == "mixed") {
      return true;

    }
    else return false;
  }



  Getjobs() {
    this.JobsService.GetJobsByBusiness(this.currentBusiness.idBusiness).subscribe(data => {
      this.jobOffers = data;
      this.dataSource.data = this.jobOffers as JobOffers[];
    }, err => {
      //console.log(err);
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


  AddJob() {

    if (this.Form.invalid) {
      this.validateAllFormFields(this.Form);
    }
    else if (this.Form.valid) {

      if (this.Form.get('requirement')?.value != null) {
        this.Form.get('requirement')?.setValue((this.Form.get('requirement')?.value).split(','));
      }

      if (this.Form.get('communicationMails')?.value != null) {
        this.Form.get('communicationMails')?.setValue((this.Form.get('communicationMails')?.value).split(','));
      }

      this.JobsService.PostJob(this.Form.value,this.currentBusiness.idBusiness)
        .subscribe(
          res => {
            this.closeDialog();
            Swal.fire({
              title: 'Job offers created successufly',
              icon: 'success',
              confirmButtonColor: '#07294d'
            })
            this.Getjobs();
          },
          err => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! ' + err,

            })

          })
    }
  }



  closeDialog() {
    this.dialogRef.close(false);
  }


  Reset() {
    this.Form.reset();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.Form.controls[controlName].invalid;
  }

  GetCountry() {
    this.JobsService.GetCountries().subscribe(res => {
      this.countries = res;
    })

  }

  onChange(val: any) {


    for (let i = 0; i < this.data.industries.length; i++) {
      if (this.data.industries.at(i).industry.industryName == val.value) {
        this.subIndustries = this.data.industries.at(i).subIndustries;
      }
    }
  }

}
