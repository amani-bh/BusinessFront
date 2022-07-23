import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import Swal from "sweetalert2";
import { AppState, CandidateApp } from '../../Shared/entities/CandidateApp';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';



@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
 
  state= new AppState(null,new Date(),"waiting",1,0,'',"",'',null,false,"");
  job!:JobOffers
  app=new CandidateApp(null,new Date(),[],"",[],this.state,this.job,null)  ;

  currentUser: any;
  isLoggedIn = false;
  constructor(private token: TokenStorageService,public dialogRef: MatDialogRef<JobDetailsComponent>,private AppService:CandidateAppService,@Inject(MAT_DIALOG_DATA) public data: any) 
  { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();
  }

  AddJobApp(job:JobOffers)
  {  
    if(this.isLoggedIn){
     Swal.fire({
      title: 'Are u sure ?',
      html: '<b>Description : </b>' +job.description +'<br><b>Requirement :</b>'+ job.requirement ,
      icon: 'warning',
      confirmButtonColor: '#07294d',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      confirmButtonText: 'Sure',
    }).then((result) => {
      if (result.isConfirmed) {
     this.app.candidateState.push(this.state)
     this.AppService.PostApp(this.app,job.idJob,this.currentUser.id).subscribe(res => 
      { 
      //console.log(res);
      Swal.fire({
        title: 'Job application has been send successufly',
        icon:'success',
        confirmButtonColor: '#07294d'
         })
      },
      err=>
      {
        //console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! ' + err,
          
        })
      })

  }
 })


  }
  else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You need to login to apply!!!',
      
    })
  }
}


}