import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TestsService } from '../../Shared/services/Tests.service';
import Swal from "sweetalert2";
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { PrehiringTests } from '../../Shared/entities/PrehiringTests';
import { approvalService } from 'src/app/Courzelo_Quizz/Shared/services/approvalService ';
import { TechTestService } from '../../Shared/services/TechTest.service';
import { TechTest } from '../../Shared/entities/TechTest';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/Courzelo_Quizz/Shared/services/quiz.service';
import { Quiz } from 'src/app/Courzelo_Quizz/Shared/entities/Quiz';
import { JobOffers } from '../../Shared/entities/JobOffers';




@Component({
  selector: 'app-tech-test',
  templateUrl: './tech-test.component.html',
  styleUrls: ['./tech-test.component.css']
})
export class TechTestComponent implements OnInit,AfterViewInit {
  currentBusiness:any;
  idJob:any
  dataState=0;
  tests!: PrehiringTests[];
  TechTest=[] as Quiz[];
  job!:JobOffers
  displayedColumns = ['title', 'creationDate', 'evaluationmodel'];

  
  @ViewChild(MatPaginator,{ static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  public dataSource= new  MatTableDataSource<Quiz>();

  constructor(private quizservice : QuizService,private _Activatedroute:ActivatedRoute,private appService:approvalService,private jobServices:JobOffersService,private _liveAnnouncer: LiveAnnouncer,private techService:TechTestService,private businesstokenStorage: BusinessTokenStorageService) {
    
   }


  ngOnInit(): void {
    this.currentBusiness = this.businesstokenStorage.getUser();
    this.idJob=this._Activatedroute.parent?.snapshot.paramMap.get('idJob');
    this.SetIdTest();
  


    /////Display Quizzes for this specific job 
    
  this.GetTechTestByJob()
  }

  ngAfterViewInit(): void {
    this.dataSource = new  MatTableDataSource<Quiz>(this.TechTest);
    this.dataSource.paginator=this.paginator
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
    

  SetIdTest(){
    //get id created quiz and add it to test table to keep track on the user list of quizzs he created 
    this.appService.currentApprovalStageMessage.subscribe(msg => 
      {
        console.log(msg)
    if(msg!=""){
      
      //add the  quiz id to job offer testid list 
      this.jobServices.AddTechTest(this.idJob,msg).subscribe(re=>console.log(re))

      //add quiz id to test table to keep track on the created quiz by the business
      var t = new TechTest(null,msg,null,new Date())
      this.techService.PostJobTechTest(t,this.currentBusiness.idBusiness).subscribe(res=>{
        
        this.appService.updateApprovalMessage('')
        
      })
    }
    
      }
    
    );

  }
    

  GetTest(){
    this.quizservice.gatallquiz().subscribe(res=>{
      this.TechTest=res
      this.dataSource.data=this.TechTest as Quiz[]
    })
  }


 
    GetTechTestByJob(){
      var i=0
      this.jobServices.GetJobById(this.idJob).subscribe((res:JobOffers)=>{
        this.TechTest=[] as Quiz[]
        if(res.idTest){
          res.idTest.map(e=>{
            this.quizservice.getquizbyid(e).subscribe(r=>{
              this.TechTest.push(r)
               i++
               if(i==res.idTest.length){
                this.dataSource = new  MatTableDataSource<Quiz>(this.TechTest);
                this.dataSource.paginator=this.paginator 
               }
             })
            }) }
        })
      
        
    }
    

  }