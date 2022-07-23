import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-quiz',
  templateUrl: './home-quiz.component.html',
  styleUrls: ['./home-quiz.component.css']
})
export class HomeQuizComponent implements OnInit {
interval:any;
timeLeft!:number;
  constructor(private _router:Router) { }

  ngOnInit(): void {
  
}
  GettoAddquiz():void{
  
    this._router.navigateByUrl("quizzSpace/AddQuiz");
  }
  GettoAddproject():void{
    this._router.navigateByUrl("quizzSpace/addproject");
  }
}
