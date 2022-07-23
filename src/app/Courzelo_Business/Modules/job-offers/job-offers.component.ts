import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import { AddJobDialogComponent } from '../add-job-dialog/add-job-dialog.component';
import { UpdJobDialogComponent } from '../upd-job-dialog/upd-job-dialog.component';
import Swal from "sweetalert2";
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { CandidateApp } from '../../Shared/entities/CandidateApp';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit, AfterViewInit {
  isLeftVisible = true;
  currentJob!: any
  currentBusiness: any;
  isChecked = true;
  jobOffers!: JobOffers[];
  public dataSource = new MatTableDataSource<JobOffers>();
  displayedColumns = ['title', 'creationDate', 'locationType', 'location', "totalApplications", "newApplications", 'requirement', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  candidateApps!: CandidateApp[];
  public dataSource2 = new MatTableDataSource<CandidateApp>();
  displayedColumns2 = ['applicationDate', 'candidateState', 'Job'];

  datePicker: FormGroup;
  status: FormGroup;
  pipe!: DatePipe;
  constructor(public datepipe: DatePipe, private fb: FormBuilder, private router: Router, private _liveAnnouncer: LiveAnnouncer,
    private JobsService: JobOffersService, private diag: MatDialog,
    private businesstokenStorage: BusinessTokenStorageService, private candidateAppService: CandidateAppService) {

    this.datePicker = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
    });

    this.status = fb.group({
      open: false,
      close: false,
    });

  }

  ngOnInit(): void {
    this.currentBusiness = this.businesstokenStorage.getUser()
    //console.log(this.currentBusiness.idBusiness)
    //this.Getjobs();
    this.check()
  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  SortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  public doFilter = (value: string) => {

    this.dataSource.filter = value.trim().toLocaleLowerCase();

  }

  filterPeriod() {


    var end = moment(this.datePicker.get('end')?.value, "YYYY-MM-DD")
    var start = moment(this.datePicker.get('start')?.value, "YYYY-MM-DD");
    if (start && end) {
      this.dataSource.data = this.jobOffers as JobOffers[]
      this.dataSource.data = this.dataSource.data.filter(e => (moment(e.creationDate).toDate() >= start.toDate()) && (moment(e.creationDate).toDate() <= end.toDate()));
      console.log(this.dataSource.data)
    }
  }


  check() {
    console.log(this.status.get('close')?.value)
    if ((this.status.get('open')?.value == true) && this.status.get('close')?.value == false) {
      this.GetJobsByState('Active')

    }
    else if ((this.status.get('close')?.value == true) && (this.status.get('open')?.value == false)) {
      this.GetJobsByState('Inactive')
    }
    else {
      this.Getjobs()
    }
  }

  GetJobsByState(state: String) {
    this.JobsService.GetJobsByBusinessAndState(this.currentBusiness.idBusiness, state).subscribe(data => {

      this.jobOffers = data;
      this.dataSource.data = this.jobOffers as JobOffers[];
      this.jobOffers.forEach(job => {
        this.GetCandidateByJob(job)

      })
    }, err => {
      console.log(err);
    })

  }

  Getjobs() {

    this.JobsService.GetJobsByBusiness(this.currentBusiness.idBusiness).subscribe(data => {
      this.jobOffers = data;
      this.dataSource.data = this.jobOffers as JobOffers[];
      this.jobOffers.forEach(job => {
        this.GetCandidateByJob(job)

      })
    }, err => {
      console.log(err);
    })
  }


  AddJobDialog() {

    const diagref = this.diag.open(AddJobDialogComponent, {
      width: '900px',
      height: '750px',


      disableClose: true,
    }).afterClosed().subscribe((res => {
      this.Getjobs();
    }));;


  }



  UpdJob(msg: any) {
    const newMsg = Object.assign({}, msg);
    //console.log(msg);
    const diagref = this.diag.open(UpdJobDialogComponent, {
      width: '650px',
      height: 'auto',
      data:
      {
        message: newMsg,
      }
    })
      .afterClosed().subscribe((res => {
        this.Getjobs();
      }));;




  }
  DeleteJob(id: number) {
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
        this.JobsService.Delete(id).subscribe(result => {
          this.Getjobs();
          Swal.fire({
            title: 'Job offers deleted successfully',
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

      }
    })




  }


  verify(job: any): boolean {
    if (job.state == "Active") {
      this.isChecked = true;
    }
    else if (job.state == "Inactive") {
      this.isChecked = false;
    }

    return this.isChecked;
  }

  public toggle(event: MatSlideToggleChange, idJob: any) {
    console.log('toggle', event.checked);
    console.log(idJob);
    if (event.checked == true) {
      this.JobsService.Activate(idJob).subscribe(res => {
        console.log(res)
        this.Getjobs();
      });
    }
    else if (event.checked == false) {
      this.JobsService.Desactivate(idJob).subscribe(res => {
        console.log(res)
        this.Getjobs();
      });;
    }

  }




  JobDash(idJob: JobOffers) {
    this.router.navigate(["JobDashboard/" + idJob + "/jobOverview"])
  }

  //Number of new applications   
  GetCandidateByJob(job: any) {

    this.candidateAppService.GetApplicationByJob(job.idJob).subscribe(res => {
      this.candidateApps = res;
      var l = 0;
      job.totalApp = this.candidateApps.length
      job.newApp = 0
      this.candidateApps.forEach(app => {
        this.candidateAppService.GetCurrentState(app.idCandidateApp).subscribe(data => {
          console.log(data)
          if (data.label == 'pending') { l++ }
          job.newApp = l;
        })

      })

    })


  }




}

