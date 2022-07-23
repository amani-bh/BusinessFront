import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Formation } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Formation';

import { User } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/User';
import { FormationService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/formation.service';
import { Quiz } from 'src/app/Courzelo_Quizz/Shared/entities/Quiz';
import { approvalService } from 'src/app/Courzelo_Quizz/Shared/services/approvalService ';
import { QuizService } from 'src/app/Courzelo_Quizz/Shared/services/quiz.service';





@Component({
  selector: 'app-grades-trainer',
  templateUrl: './grades-trainer.component.html',
  styleUrls: ['./grades-trainer.component.css']
})
export class GradesTrainerComponent implements OnInit,AfterViewInit {
  users!:User[]

  quiz!:Quiz[];
  id:any
  formation:any;

  displayedColumns: string[] = [ 'name'];
  
 dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
 constructor(private formationService:FormationService,private appService:approvalService,private quizservice : QuizService) { }

  ngOnInit(): void {
    this.id =localStorage.getItem("idFormation1")
    this.formationService.getListUserParticipant(this.id).subscribe(res=>{
      this.users=res
      this.dataSource.data=this.users as User[]
      
    })

    this.GetQuizByFormation();
  }
ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  GetQuizByFormation(){
    var i=0
    this.formationService.getFormationsById(this.id).subscribe((res:Formation)=>{
      let quiz=[] as Quiz[]
      
        res.idQuiz.map(e=>{
          this.quizservice.getquizbyid(e).subscribe(r=>{
            quiz.push(r)
            this.addColumn(r.title)
             i++
             if(i==res.idQuiz.length){
               this.quiz=quiz
              console.log(this.quiz)
              console.log(this.displayedColumns.slice(1))

             
             }
           })
          })
      })
      
  }

  addColumn(t:string) {
  
    this.displayedColumns.push(t);
  }

  public doFilter = (value: string) => {
   
    this.dataSource.filter = value.trim().toLocaleLowerCase();

  }
}
 

  
