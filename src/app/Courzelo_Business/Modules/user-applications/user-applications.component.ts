import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { AppState, CandidateApp } from '../../Shared/entities/CandidateApp';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import Swal from "sweetalert2";
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { WebSocketService } from '../../Shared/services/websocket.service';

@Component({
  selector: 'app-user-applicatinos',
  templateUrl: './user-applications.component.html',
  styleUrls: ['./user-applications.component.css']
})
export class UserApplicationsComponent implements OnInit {

  candidateApps!: CandidateApp[];
  public dataSource= new  MatTableDataSource<CandidateApp>();
  displayedColumns = ['applicationDate','candidateState','Job','interview'];
  JobOffer!:JobOffers;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  fileUrl:any
  file:any
  currentUser: any;
  isLoggedIn = false;
  currentJob:any
  isLeftVisible = true;
  currentApp!:CandidateApp;
  viewType=""

  
  public radarChartOptions: ChartConfiguration['options'] = {responsive: true,  };
  public radarChartLabels= ['PHP', '.Net', 'Java', 'Android', 'Node.JS'];
  public radarChartData: ChartDataset[] = [{ data: [62, 59, 80, 81, 56], label: 'skills' }, ];
  public radarChartType: ChartType = 'radar';
  
  constructor(private socketService:WebSocketService,private businessAuthService: BusinessAuthService,private token: TokenStorageService,private _liveAnnouncer: LiveAnnouncer,private JobsService:JobOffersService,private AppService:CandidateAppService) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();
    this.GetApps();
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


 
    
  
  public doFilter (value: string)  {
    if(value){
      this.dataSource.data=this.candidateApps as CandidateApp[]
      this.dataSource.data= this.dataSource.data.filter(e=>((e.job.title as string ).includes(value)) || ((e.currentState.label as string).includes(value)))
    }
    else{
      this.dataSource.data=this.candidateApps as CandidateApp[]
    }
  }

  GetApps(){
    
    this.AppService.GetApplicationByUser(this.currentUser.id).subscribe(data=>{this.candidateApps=data;
     this.dataSource.data = this.candidateApps as CandidateApp[];
     this.candidateApps.forEach(item=> {
       if(this.getLength(item.candidateState)!=0)
        {
        if (this.getLength(item.candidateState)!=0){
          this.AppService.GetCurrentState(item.idCandidateApp).subscribe(data=>{
           item.currentState=data;
             })
         }
       }
     })
    },err=>{
      console.log(err);
    })
      
  }


  AcceptOffer(app:CandidateApp){
    let state= new AppState(null,new Date(),"official offer accepted",app.currentState.step+1,0,'',"",'',null,false,app.currentState.offerDoc,"",0);
    this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>{
      this.GetApps();
      this.SendNotif(app.job.business.idBusiness,"Candidate ( "+ app.idCandidateApp+" )has accepted your offer for the job "+app.job.title)
      
      Swal.fire({
        title: 'You have successufly accepted the official offer',
        icon:'success',
        confirmButtonColor: '#07294d'
         })
    })
  }

  RefuseOffer(app:CandidateApp){
    let state= new AppState(null,new Date(),"official offer refused",app.currentState.step+1,0,'',"",'',null,false,app.currentState.offerDoc,"",0);
    this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>{
      this.GetApps();
      this.SendNotif(app.job.business.idBusiness,"Candidate ( "+ app.idCandidateApp+" )has rejected your offer for the job "+app.job.title)
      

      Swal.fire({
        title: 'You have successufly refused the official offer',
        icon:'success',
        confirmButtonColor: '#07294d'
         })

    })
  }


  AcceptRequest(app:CandidateApp){
    let state= new AppState(null,new Date(),"pending",app.currentState.step+1,0,'',"",'',null,false,app.currentState.offerDoc,"",0);
    this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>{
      this.GetApps();
      Swal.fire({
        title: 'You have successufly accepted the job request',
        icon:'success',
        confirmButtonColor: '#07294d'
         })

         this.SendNotif(app.job.business.idBusiness,"Candidate ( "+ app.idCandidateApp+" )has accepted your request for the job "+app.job.title)
      
    })
  }

  RefuseRequest(app:CandidateApp){
    let state= new AppState(null,new Date(),"Job rquest refused",app.currentState.step+1,0,'',"",'',null,false,app.currentState.offerDoc,"",0);
    this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>{
      this.GetApps();

      Swal.fire({
        title: 'You have successufly refused the job request',
        icon:'success',
        confirmButtonColor: '#07294d'
         })

         this.SendNotif(app.job.business.idBusiness,"Candidate ( "+ app.idCandidateApp+" )has rejected your request for the job "+app.job.title)
      

    })
  }



  
  getLength(obj:any)
  {
    if((obj===null)|| (obj === undefined))
      {
        return 0;
      }
      else {
        return Object.keys(obj).length;
      }
    
    
  }

 

/*
  GetJobById(idJob:any){
    this.JobsService.GetJobById(idJob).subscribe(res=>
       {this.JobOffer=res;
      console.log(this.JobOffer);
      }
      )
  }
*/


//load official offer documents
  LoadPdf(state:AppState){

    if(state.offerDoc){
         window.open(state.offerDoc);    
  }
}


//View Job request
Details(idJob:any){
  this.viewType=""
  this.JobsService.GetJobById(idJob).subscribe(res=>{
    this.currentJob=res
    this.viewType="job"
    
  })
}


/*GetBusiness(id:any){
  this.businessAuthService.GetUserById(id).subscribe(res=>{
    this.currentJob.business=res;
  })

}*/


OpenMeet(link:string){
  window.open( "https://"+link, "_blank");
}


GetCandidate(id:any){
  this.viewType=""
  this.AppService.GetApplicationById(id).subscribe(res=>{
    this.currentApp=res;
    this.viewType="candidate"
    if(this.currentApp.candidateState.length!=0){
      this.AppService.GetCurrentState(this.currentApp.idCandidateApp).subscribe(data=>{
        this.currentApp.currentState=data;
       console.log(this.currentApp)  
       })
    }
  })

}




SendNotif(id:any,msg:any){
  this.socketService.Notify(id,msg).subscribe(res=>{
  
  })
  }

}
