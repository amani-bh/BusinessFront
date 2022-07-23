
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import {  StepperOrientation } from '@angular/material/stepper';
import { Quiz } from '../../Shared/entities/Quiz';
import { QuizService } from '../../Shared/services/quiz.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import {Location} from '@angular/common';
import { approvalService } from '../../Shared/services/approvalService ';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  quiz: Quiz = new Quiz();
  fbuilder: FormBuilder = new FormBuilder();
  Quizform!: FormGroup;
  selected = 'option2';

  stepperOrientation!: Observable<StepperOrientation>;
  constructor(private appService:approvalService,private route: ActivatedRoute,private _location: Location,private quizservice: QuizService, private _router: Router,breakpointObserver: BreakpointObserver) {  this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));}

  ngOnInit(): void {
    
    this.Quizform = this.fbuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      typecountdown: ['', [Validators.required]],
      countperquiz: ['20', [Validators.required]],
      limitdate: ['', [Validators.required]],
      evaluationmodel: ['', [Validators.required]],
    })
  }
  public hasError(controlName: string, errorName: string) {
    this.Quizform.markAsTouched();
    return this.Quizform.controls[controlName].hasError(errorName);
  }

  add() {
    this.quiz = this.Quizform.value;
    this.quiz.questionsList = [];
    this.quiz.correctionsList=[];
    this.quiz.creationdate = new Date();
  
    this.quizservice.addquiz(this.quiz).subscribe(res => {
      console.log(res.id)
      this.appService.updateApprovalMessage(res.id)
      Swal.fire({
        title: 'Quiz created successfully .!. Next add your questions!',
        icon: 'success',
        confirmButtonColor: '#07294d',
      }),
     
      this._router.navigate(["AddQuestions/"+res.id],{ relativeTo: this.route })
    }
    );

  }

  back(){
    this._location.back();
  }


}
