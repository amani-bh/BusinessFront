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
import { OfferDiagComponent } from '../offer-diag/offer-diag.component';
import { SendTestComponent } from '../send-test/send-test.component';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { SkillsService } from '../../Shared/services/Skills.service';
import { Macroskills } from 'src/app/Courzelo_Skills/Shared/entities/Macroskills';
import { I } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-compare-candidate',
  templateUrl: './compare-candidate.component.html',
  styleUrls: ['./compare-candidate.component.css']
})
export class CompareCandidateComponent implements OnInit {

  public radarChartOptions: ChartConfiguration['options'] = {responsive: true,  };
  public radarChartLabels= [] as String[];
  public radarChartData: ChartDataset[] = [];
  public radarChartType: ChartType = 'radar';
  panelOpenState = false;
  mySelections=[] as CandidateApp[] ;
  fileUrl:any
  file:any
  currentBusiness:any;
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
  @ViewChild(BaseChartDirective)public chart: BaseChartDirective;
  idJob:any;

  constructor(private _Activatedroute:ActivatedRoute,private diag: MatDialog,private fb: FormBuilder, private businesstokenStorage: BusinessTokenStorageService,private JobsService:JobOffersService,private AppService:CandidateAppService,private skillsService:SkillsService) { }


  ngOnInit(): void {
    this.idJob=this._Activatedroute.parent?.snapshot.paramMap.get('idJob');
    this.GetAppsByJob(this.idJob)
     //this.dataSource.data=this.candidateApps as CandidateApp[]
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

      
  GetApps(candidateApp:CandidateApp[]){
    candidateApp.forEach(item=> {
       if(this.getLength(item.candidateState)!=0)
        {
        if (this.getLength(item.candidateState)!=0){
          this.AppService.GetCurrentState(item.idCandidateApp).subscribe(data=>{
           item.currentState=data;
          // console.log(item)  
          })
         }
        }
     })

    //console.log(this.dataSource.data)
   // console.log(this.candidateApps)
      
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

  

 
   Random(min:any, max:any) {
    return Math.random() * (max - min) + min;
  }

  checkSelection(e:any,value:CandidateApp){
    console.log(this.mySelections.length)
    if(e.checked==true){
      if(this.mySelections.length<=5){
      this.mySelections.push(value);
      console.log(this.mySelections)
     // let d= [this.Random(0,100), this.Random(0,100), this.Random(0,100), this.Random(0,100), this.Random(0,100)]
      //let l= value.idCandidateApp
      //this.radarChartData.push({data:d,label : l})
      //this.radarChartLabels.push('asma')
      //this.radarChartData.forEach(e=>e.data.push(0))
      let i=0
      this.mySelections.forEach(app=>{
        this.skillsLabels(app.user.id) 
        i++;
      })

      if(i==this.mySelections.length){
        
        
        this.Getdata();
        this.chart?.chart?.update();
        //console.log(this.radarChartLabels)
        //console.log(this.radarChartData)
      }
      

    }
  }
    else if( e.checked==false){
      var x =this.mySelections.findIndex(e=>e.idCandidateApp==value.idCandidateApp);
      this.mySelections.splice(x,1);
      var y=this.radarChartData.findIndex(e=>e.label==value.idCandidateApp)
      this.radarChartData.splice(y,1)
      this.chart.chart?.update();
      
    }

  }
    
    
  public disableCheckbox2(id:any):any {
    if(this.mySelections.length<5){
      return false
    }
    else if (this.mySelections.length>=5){
      if(this.mySelections.find(e=>e.idCandidateApp==id)){
        return false
      }
      else return true 
    }
    
  }

  public disableCheckbox(id:any): boolean {
    return this.mySelections.length >= 5 && !this.mySelections.includes(id);
  }


Getdata(){
  
    this.mySelections.forEach(app=>{
    this.radarChartData=[]
    this.skillsService.GetMacrohardskills(app.user.id).subscribe(res=>{
      

      let data=[] as number[]
      //fill array with zero
      for(var i=0;i<this.radarChartLabels.length;i++){
        data[i]=0
      }

      for(var x=0;x<this.radarChartLabels.length;x++){
        for(var y=0;y<res.length;y++){
          if(this.radarChartLabels[x]==res[y].name){
            data[x]=res[y].totalprogress
          }
        }

        if(x==this.radarChartLabels.length-1){
          this.radarChartData.push({data:data,label:app.idCandidateApp});
          this.chart.chart?.update();
        }
      }
      
      

    })
   })
}

skillsLabels(id:any){
 
      this.skillsService.GetMacrohardskills(id).subscribe(res=>{
       //get all labels
        res.forEach(s=> {
          if(!this.radarChartLabels.includes(s.name))
          {
            this.radarChartLabels.push(s.name)
            this.chart?.chart?.update();

            
          }
        })
        
      })
    
      this.chart?.chart?.update();
  

      
        

}


}

