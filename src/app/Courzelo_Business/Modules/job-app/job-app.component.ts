import { LiveAnnouncer } from '@angular/cdk/a11y';
import {  Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateApp, AppState } from '../../Shared/entities/CandidateApp';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { JobOffersService } from '../../Shared/services/JobOffers.service';

import { ChartConfiguration, ChartDataset, ChartType } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { InterviewDiagComponent } from '../interview-diag/interview-diag.component';
import { ActivatedRoute } from '@angular/router';
import { OfferDiagComponent } from '../offer-diag/offer-diag.component';
import { SendTestComponent } from '../send-test/send-test.component';
import { WebSocketService } from '../../Shared/services/websocket.service';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-job-app',
  templateUrl: './job-app.component.html',
  styleUrls: ['./job-app.component.css']
})
export class JobAppComponent implements OnInit {

  public radarChartOptions: ChartConfiguration['options'] = {responsive: true, };
  public radarChartLabels= ['PHP', '.Net', 'Java', 'Android', 'Node.JS'];
  
  public radarChartData: ChartDataset[] = [{ data: [62, 59, 80, 81, 56], label: 'skills' },];
  public radarChartType: ChartType = 'radar';

  fileUrl:any
  file:any
  idJob:any;
  jobs!:JobOffers[]
  appByJob!:CandidateApp[];
  candidateApps!: CandidateApp[];
  public dataSource= new  MatTableDataSource<CandidateApp>();
  displayedColumns = ['applicationDate','candidateState','Job'];
  JobOffer!:JobOffers;
  currentApp:any
  Form!: FormGroup;
  search=new FormControl('');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;


  constructor(private socketService:WebSocketService,private _Activatedroute:ActivatedRoute,private diag: MatDialog,private fb: FormBuilder,private businessAuthService: BusinessAuthService, private businesstokenStorage: BusinessTokenStorageService,private _liveAnnouncer: LiveAnnouncer,private JobsService:JobOffersService,private AppService:CandidateAppService) {
    
   }


  ngOnInit(): void {
    //this.currentBusiness = this.businesstokenStorage.getUser()
    //this.GetApps();
    this.idJob=this._Activatedroute.parent?.snapshot.paramMap.get('idJob');
    this.GetAppsByJob(this.idJob)
   
    this.Form = this.fb.group({
      state : []
    
    })
    

   
  }



  public doFilter (value: string)  {
    if(value){
      this.dataSource.data=this.candidateApps as CandidateApp[]
      this.dataSource.data= this.dataSource.data.filter(e=>((e.idCandidateApp as string).includes(value)) || ((e.job.title as string).includes(value)) || ((e.job.idJob as string).includes(value))|| ((e.currentState.label as string).includes(value)))
    }
    else{
      this.dataSource.data=this.candidateApps as CandidateApp[]
    } 
  }

      
  //get current state
  GetApps(candidateApp:CandidateApp[]){
    candidateApp.forEach(item=> {
       if(this.getLength(item.candidateState)!=0)
        {
        if (this.getLength(item.candidateState)!=0){
          this.AppService.GetCurrentState(item.idCandidateApp).subscribe(data=>{
           item.currentState=data;
           console.log(item)  })
         }
       }

       
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

 

   GetAppsByJob(idJob:any){
          this.AppService.GetApplicationByJob(idJob).subscribe(res=>{
          this.candidateApps=res as CandidateApp[]
          this.GetApps(this.candidateApps)
          this.candidateApps.forEach(app=>{
           if(this.currentApp){
            if(app.idCandidateApp==this.currentApp.idCandidateApp){this.currentApp=app}
           }
          })
          this.dataSource.data=this.candidateApps as CandidateApp[]
        })

        
  }


  

  updState(app:CandidateApp){
    
    var  state= new AppState(null,new Date(),"screening",app.currentState.step+1,0,'',"",'',null,false,"");
    this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>
      {
        console.log(res);
        this.Form.enable()
        this.GetAppsByJob(this.idJob)
        this.SendNotif(app.user.id,"Your application ( "+ app.idCandidateApp+" )for the job "+app.job.title+" has been changed")
      
      })
    
  }
 



  /*GetJobById(idJob:any){
    this.JobsService.GetJobById(idJob).subscribe(res=>
       {this.JobOffer=res;
    
      }
      )
  }*/

  GetAppById(app:any){
    this.AppService.GetApplicationById(app.idCandidateApp).subscribe(res=>
      {
        app=res;
      })
  }

  onSelectionChange(e:any){
    console.log(e)
    this.currentApp=e
    

    if(this.currentApp.currentState.label=='pending'){
      this.Form.disable();
    }
    else this.Form.enable()
  }


  moveTo(e:any,app:any){
    
    if(e.value=="Hired"){
      
      var  state= new AppState(null,new Date(),"hired",app.currentState.step+1,0,'',"",'',null,false,"");
      this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>{
        console.log(res)
        this.GetAppsByJob(this.idJob)
        this.SendNotif(app.user.id,"Your application ( "+ app.idCandidateApp+" )for the job "+app.job.title+" has been changed ! congrats you have been Hired")
      
        
      
      })

    }

    else if(e.value=="Interview"){
      const newMsg = Object.assign({}, app);
      const diagref = this.diag.open(InterviewDiagComponent, {
        width: '900px',
        height: '450px',
        data:
        {
          message:newMsg,
        },
       
        disableClose: true,
      }) .afterClosed().subscribe((res => {
        this.GetAppsByJob(this.idJob)
        console.log(this.currentApp)
       
      
      }));;
     
      
    }
    else if(e.value=="Send test"){
      const newMsg = Object.assign({}, app);
      const diagref = this.diag.open(SendTestComponent, {
        width: '500px',
        height: '350px',
        data:
        {
          message:newMsg,
        },
       
        disableClose: true,
      }) .afterClosed().subscribe((res => {
       this.GetApps(this.candidateApps)
       
      }));;
     
      
    }

    else if(e.value=="Send offer"){
      const newMsg = Object.assign({}, app);
      const diagref = this.diag.open(OfferDiagComponent, {
        width: '900px',
        height: '380px',
        data:
        {
          message:newMsg,
        },
       
        disableClose: true,
      }) .afterClosed().subscribe((res => {
        this.GetAppsByJob(this.idJob)
        
      
      
      }));;
     

    }

  }

  Reject(app:any){
    
    var  state= new AppState(null,new Date(),"rejected",app.currentState.step+1,0,'',"",'',new Date(),false,"");
    this.AppService.AddState(state,app.idCandidateApp).subscribe(res=>{
      this.GetAppsByJob(this.idJob)
      this.SendNotif(app.user.id,"Your application ( "+ app.idCandidateApp+" )for the job "+app.job.title+" has been rejected ")
      
    })
  }
  numSequence(n: number): Array<number> {
    return Array(n);
  }




  


  
viewTest(id:any){
  window.open( "quizdetail/"+id, "_blank");
}

OpenMeet(link:string){
  window.open( "https://"+link, "_blank");
}

SendNotif(id:any,msg:any){
this.socketService.Notify(id,msg).subscribe(res=>{

})
}
}
