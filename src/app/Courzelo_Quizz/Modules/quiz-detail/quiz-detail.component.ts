import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../Shared/entities/Quiz';
import { QuizService } from '../../Shared/services/quiz.service';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.css']
})
export class QuizDetailComponent implements OnInit {
  quiz:Quiz=new Quiz();

  idquiz!:string;
  state:boolean=true;
  //if type==QCM MA(DOUMA)
  //if type==Y/N NIMCHI lil correct n'affichi toul
  //if type==qcu nal3ab ala il wrong
  ///ken key word
  constructor(private quizservice : QuizService,private ar :ActivatedRoute,private _router:Router) { }

  ngOnInit(): void {

    
    this.ar.paramMap.subscribe(params => {
      this.idquiz = String(params.get('id'));
     
    });
   
    this.quizservice.getquizbyid(this.idquiz).subscribe(res=>{this.quiz=res;console.log(res.type)});

   
  }

}
