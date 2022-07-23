import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Formation } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Formation';
import { FormationService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/formation.service';
import { Quiz } from 'src/app/Courzelo_Quizz/Shared/entities/Quiz';
import { approvalService } from 'src/app/Courzelo_Quizz/Shared/services/approvalService ';
import { QuizService } from 'src/app/Courzelo_Quizz/Shared/services/quiz.service';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css']
})
export class AssessmentsComponent implements OnInit,AfterViewInit {
  quiz!:Quiz[];
  
  idFormation:any
  formation:any;
  displayedColumns = ['title','creationdate','evaluationmodel','action'];
  public dataSource= new  MatTableDataSource<Quiz>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(private appService:approvalService,private _liveAnnouncer: LiveAnnouncer,private quizservice : QuizService,private formationService:FormationService) { }

  ngOnInit(): void {
    this.idFormation=localStorage.getItem('idFormation1')
    console.log(this.idFormation)
    this.SetIdQuiz()
    this.GetQuizByFormation()
   

  }


  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  

 
  SortChange(sortState: any) {
  
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public doFilter = (value: string) => {
   
    this.dataSource.filter = value.trim().toLocaleLowerCase();

  }


  SetIdQuiz(){
    //get id created quiz and add it to test table to keep track on the user list of quizzs he created 
    this.appService.currentApprovalStageMessage.subscribe(msg => 
      {
    if(msg!=""){
      console.log(this.idFormation)
      console.log(msg)
      //add the  quiz id to job offer testid list 
      this.formationService.addquizz(this.idFormation,msg).subscribe(re=>
        {
          console.log(re);
          this.appService.updateApprovalMessage('')
        
        })
    }
    
      }
    
    );

  }

  GetQuizByFormation(){
    var i=0
    this.formationService.getFormationsById(this.idFormation).subscribe((res:Formation)=>{
      this.quiz=[] as Quiz[]
      
        res.idQuiz.map(e=>{
          this.quizservice.getquizbyid(e).subscribe(r=>{
            this.quiz.push(r)
             i++
             if(i==res.idQuiz.length){
              console.log(this.quiz)
              this.dataSource = new  MatTableDataSource<Quiz>(this.quiz);
              this.dataSource.paginator=this.paginator 
             }
           })
          })
      })
      
  }

}

