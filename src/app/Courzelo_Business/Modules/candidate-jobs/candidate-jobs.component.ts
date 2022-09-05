
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AppState, CandidateApp } from '../../Shared/entities/CandidateApp';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import Swal from "sweetalert2";
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { ApplyDiagComponent } from '../../Modules/apply-diag/apply-diag.component';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-candidate-jobs',
  templateUrl: './candidate-jobs.component.html',
  styleUrls: ['./candidate-jobs.component.css']
  
})
export class CandidateJobsComponent implements OnInit {
  isLeftVisible = true;
  jobOffers!: JobOffers[];
  candidateApp!: CandidateApp[];
  business:any;
  public dataSource2= new  MatTableDataSource<CandidateApp>();
  state= new AppState(null,new Date(),"pending",1,0,'',"",'',null,false,"","",0);
  job!:JobOffers
  app=new CandidateApp(null,new Date(),[],"",[],this.state,this.job,null) ;
  dataSource: MatTableDataSource<JobOffers> = new MatTableDataSource<JobOffers>(this.jobOffers);
  currentUser: any;
  isLoggedIn = false;
  currentJob!:any;
  s!:any ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
 
   // MatPaginator Inputs
   length:any;
   pageSize = 5;
   
   // MatPaginator Output
   pageEvent!: PageEvent;

   search=new FormControl('');
   searchLocation=new FormControl('');
   
  constructor(private businessAuthService: BusinessAuthService,private token: TokenStorageService,private JobsService:JobOffersService,private AppService:CandidateAppService,private diag: MatDialog) { }
  

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();
    this.Getjobs();
    //this.GetjobsApp();

  }


 
  


  Getjobs(){
    
    this.JobsService.GetAlldJobsByState("Active").subscribe(data=>{
     this.jobOffers=data;
     this.dataSource.data=this.jobOffers as JobOffers[]
     this.length=this.dataSource.data.length
       },err=>{
      console.log(err);
    })}


    /*public doFilter (value: string)  {
      if(value){
        this.dataSource.data=this.candidateApps as CandidateApp[]
        this.dataSource.data= this.dataSource.data.filter(e=>((e.idCandidateApp as string).includes(value)) || ((e.job.title as string).includes(value)) || ((e.job.idJob as string).includes(value))|| ((e.currentState.label as string).includes(value)))
      }
      else{
        this.dataSource.data=this.candidateApps as CandidateApp[]
      } 
    }
    */


   /* public doFilter (value: string)  {
      //this.dataSource.data=this.jobOffers as JobOffers[]
      if(value){
        this.dataSource.data=this.jobOffers as JobOffers[]
        this.dataSource.data = this.dataSource.data.filter(e => e.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()) || e.description.toLocaleLowerCase().includes(value.toLocaleLowerCase()) );
      }
      else {
        this.dataSource.data=this.jobOffers as JobOffers[]
      }
     
      
  
    }*/

    public doFilter() {

      if(this.search.value  && !this.searchLocation.value){
        this.dataSource.data=this.jobOffers as JobOffers[]
        this.dataSource.data = this.dataSource.data.filter(e => e.title.toLocaleLowerCase().includes(this.search.value.toLocaleLowerCase()) || e.description.toLocaleLowerCase().includes(this.search.value.toLocaleLowerCase()) );
     
      }
      else if(!this.search.value && this.searchLocation.value){
        this.dataSource.data =this.jobOffers as JobOffers[]
        this.dataSource.data = this.dataSource.data.filter(e => e.location.toLocaleLowerCase().includes(this.searchLocation.value.toLocaleLowerCase()) || e.country.toLocaleLowerCase().includes(this.searchLocation.value.toLocaleLowerCase()) );
      
      }
      else if (this.search.value && this.searchLocation.value){
        this.dataSource.data =this.jobOffers as JobOffers[]
        this.dataSource.data = this.dataSource.data.filter(e => (e.location.toLocaleLowerCase().includes(this.searchLocation.value.toLocaleLowerCase()) || e.country.toLocaleLowerCase().includes(this.searchLocation.value.toLocaleLowerCase()) ) && (e.title.toLocaleLowerCase().includes(this.search.value.toLocaleLowerCase()) || e.description.toLocaleLowerCase().includes(this.search.value.toLocaleLowerCase())));
      }
      else {
        this.dataSource.data =this.jobOffers as JobOffers[]
      }
     
  
    }
  

  /*  GetjobsApp(){
      this.AppService.GetAlldApps().subscribe(data=>{
        this.candidateApp=data;
         },err=>{
        console.log(err);
      })}*/
  


    

      AddJobApp(job:JobOffers){
        if(this.isLoggedIn){
          this.AppService.ExistApp(job.idJob,this.currentUser.id).subscribe(res=>{
            if(res==false){
              const newMsg = Object.assign({}, job);
              const diagref = this.diag.open(ApplyDiagComponent, {
              width: '900px',
              height: '450px',
              data:
              {
                message:newMsg,
              },
             
              disableClose: true,
            }) 
          }
          else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'You have already applied for this job!!',
              
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


  

    Details(job:JobOffers){
      this.currentJob=job;
      //this.GetBusiness(this.currentJob.idBusiness)
    }


  /*  GetBusiness(id:any){
      this.businessAuthService.GetUserById(id).subscribe(res=>{
        this.currentJob.business=res;
      })

    }*/


}



