import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../Shared/entities/Quiz';
import { QuizService } from '../../Shared/services/quiz.service';
import Swal from 'sweetalert2';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { StepperOrientation } from '@angular/cdk/stepper';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {
  visible = true;
  selectable1 = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fb: FormBuilder = new FormBuilder();
  questionformY_N!: FormGroup;
  questionformO_Q!: FormGroup;
  questionformQCU!: FormGroup;
  questionformQCM!: FormGroup;
  quiz: Quiz = new Quiz();
  selected!: string;
  selectable = false;
  idquiz!: string;
  state = 0;
  state1 = 0;
  state3 = 0;
  types: string[] = ['MCQ', 'SCQ', 'Y/N', 'Open_questions'];
  correct: string[] = [];
  keys: string[] = [];
  wrong: string[] = [];

  stepperOrientation!: Observable<StepperOrientation>;
  constructor(private ar: ActivatedRoute, private quizservice: QuizService, private _router: Router,breakpointObserver: BreakpointObserver) { this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));}

  ngOnInit(): void {
    this.ar.paramMap.subscribe(params => {
      this.idquiz = String(params.get('id'));
    });

    this.quizservice.getquizbyid(this.idquiz).subscribe(res => this.quiz = res);
    this.questionformQCU = this.fb.group({
      qcus: this.fb.array([])
    });

    this.questionformQCM = this.fb.group({
      qcms: this.fb.array([])
    });

    this.questionformY_N = this.fb.group({
      yn: this.fb.array([])
    });
    this.questionformO_Q = this.fb.group({
      Open_Questions: this.fb.array([])
    });

  }



  add(event: MatChipInputEvent, openquestionIndex: number): void {
    const input = event.input;
    const value = event.value;
    //add value
    if ((value || '').trim()) {
      this.Open_Questions().value[openquestionIndex].keywords.push(value)
      this.state1++;
    }
    if (input) {
      input.value = '';
    }

  }

  remove(fruit: string, openquestionIndex: number): void {
    const index = this.Open_Questions().value[openquestionIndex].keywords.indexOf(fruit);
    if (index >= 0) {
      this.Open_Questions().value[openquestionIndex].keywords.splice(index, 1);
      this.state1--;
    }
  }



  get(type: string): void {
    this.selectable = true;
    this.selected = type;
    this.quiz.type = this.selected;

  }
  //debut openquestion
  Open_Questions(): FormArray {
    return this.questionformO_Q.get('Open_Questions') as FormArray;
  }
  newOpen_Questions(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      points: ['', Validators.required],
      timerperquestion: ['1', Validators.required],
      keywords: [[], ],
    });
  }

  addOpen_Questions() {

    this.Open_Questions().push(this.newOpen_Questions());
    this.state++;
    this.state1 = 0;
  }

  removeOpen_Questions(openquestionIndex: number) {
    this.Open_Questions().removeAt(openquestionIndex);
    this.state--;
  }
  //fin open questions
  //debut yes no
  yes_no(): FormArray {
    return this.questionformY_N.get('yn') as FormArray;
  }

  newyes_no(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      points: ['', Validators.required],
      timerperquestion: ['1', Validators.required],
      correctanswer: ['', Validators.required],
    });
  }

  addyes_no() {
    this.yes_no().push(this.newyes_no());
    this.state++;
  }

  removeyes_no(y_nindex: number) {
    this.yes_no().removeAt(y_nindex);
    this.state--;
  }
  //fin yes no
  ///debut qcm
  qcms(): FormArray {
    return this.questionformQCM.get('qcms') as FormArray;
  }
  newqcm(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      points: ['', Validators.required],
      timerperquestion: ['1', Validators.required],
      correct: ['', Validators.required],
      wrong: ['', Validators.required],
      corrects: this.fb.array([]),
      wrongsanwers: this.fb.array([])
    });
  }
  addqcm() {
    this.qcms().push(this.newqcm());
    if (this.state >= 2 && this.state1 >= 2) {
      this.state = 0;
      this.state1 = 0;
    }
    this.state++;//qcmcorrect
    this.state1++;//qcm wrong
    this.state3++;
  }

  removeqcm(qcmindex: number) {
    this.qcms().removeAt(qcmindex);
    this.state3--; //qcm question
  }
  //correct
  correctqcm(qcmindex: number): FormArray {
    return this.qcms()
      .at(qcmindex)
      .get('corrects') as FormArray;
  }
  newcorrect(): FormGroup {
    return this.fb.group({
      correct: '',

    });
  }
  addqcmcorrect(qcmindex: number) {
    this.correctqcm(qcmindex).push(this.newcorrect());
    this.state++;
  }

  removeqcmcorrect(qcmindex: number, qcmcorrectindex: number) {
    this.correctqcm(qcmindex).removeAt(qcmcorrectindex);
    this.state--;
  }
  //fin correct
  //debut wrong
  wrongqcm(qcmindex: number): FormArray {
    return this.qcms()
      .at(qcmindex)
      .get('wrongsanwers') as FormArray;
  }

  newwrongqcm(): FormGroup {
    return this.fb.group({
      wrong: '',

    });
  }

  addqcmwrong(qcmindex: number) {
    this.wrongqcm(qcmindex).push(this.newwrongqcm());
    this.state1++;
  }

  removeqcmwrong(qcmindex: number, qcmwrongindex: number) {
    this.wrongqcm(qcmindex).removeAt(qcmwrongindex);
    this.state1--;
  }

  //finqcm
  //qcu
  qcu(): FormArray {
    return this.questionformQCU.get('qcus') as FormArray;
  }

  newqcu(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      points: ['', Validators.required],
      correct: ['', Validators.required],
      wrong: ['', Validators.required],
      timerperquestion: ['1', Validators.required],
      wrongsanwers: this.fb.array([
      ])
    });
  }

  addqcu() {
    this.qcu().push(this.newqcu());

    if (this.state >= 2) {
      this.state = 0;
    }
    this.state++;//qcu wrong
    this.state1++;//qcu question
  }

  removeqcu(qcuindex: number) {
    this.qcu().removeAt(qcuindex);
    this.state1--; //qcuquestion
  }

  wrongqcu(qcuindex: number): FormArray {
    return this.qcu()
      .at(qcuindex)
      .get('wrongsanwers') as FormArray;
  }

  newwrong(): FormGroup {
    return this.fb.group({
      wrong: '',
    });
  }

  addqcuwrong(qcuindex: number) {
    this.wrongqcu(qcuindex).push(this.newwrong());
    this.state++;
  }

  removeqcuwrong(qcuindex: number, qcuwrongindex: number) {
    this.wrongqcu(qcuindex).removeAt(qcuwrongindex);
    this.state--;
  }
  //fin qcu
  drop(event: CdkDragDrop<FormArray[]>) {
    switch (this.selected) {
      case "SCQ": {
        moveItemInArray(this.qcu().controls, event.previousIndex, event.currentIndex);
        break;
      }
      case "MCQ": {
        moveItemInArray(this.qcms().controls, event.previousIndex, event.currentIndex);
        break;
      }
      case "Y/N": {
        moveItemInArray(this.yes_no().controls, event.previousIndex, event.currentIndex);
        break
      }
      case "Open_questions": {
        moveItemInArray(this.Open_Questions().controls, event.previousIndex, event.currentIndex);
      }
    }
  }
  post() {
    switch (this.selected) {
      case "SCQ": {
        for (let j = 0; j <= this.qcu().length - 1; j++) {
          this.wrong.push(this.qcu().at(j).value.wrong)
          for (let i = 0; i <= this.wrongqcu(j).length - 1; i++) {
            this.wrong.push(this.wrongqcu(j).at(i).value.wrong);
          }
          this.correct.push(this.qcu().at(j).value.correct)

          this.quiz.questionsList.push({
            question: this.qcu().at(j).value.question,
            points: this.qcu().at(j).value.points,
            timerperquestion: this.qcu().at(j).value.timerperquestion,
            correctanswer: this.correct,
            wronganswer: this.wrong
          });

          this.correct = []
          this.wrong = []
        }
        break;
      }
      case "MCQ": {
        for (let j = 0; j <= this.qcms().length - 1; j++) {
          this.wrong.push(this.qcms().at(j).value.wrong)
          this.correct.push(this.qcms().at(j).value.correct)
          for (let i = 0; i <= this.wrongqcm(j).length - 1; i++) {
            this.wrong.push(this.wrongqcm(j).at(i).value.wrong);
          }
          for (let t = 0; t <= this.correctqcm(j).length - 1; t++) {
            this.correct.push(this.correctqcm(j).at(t).value.correct);
          }

          this.quiz.questionsList.push({
            question: this.qcms().at(j).value.question,
            points: this.qcms().at(j).value.points,
            timerperquestion: this.qcms().at(j).value.timerperquestion,
            correctanswer: this.correct,
            wronganswer: this.wrong
          });

          this.correct = []
          this.wrong = []
        }
        break;
      }
      case "Y/N": {
        for (let j = 0; j <= this.yes_no().length - 1; j++) {
          if (this.yes_no().at(j).value.correctanswer == "Yes") { this.wrong.push("No") }
          else {
            this.wrong.push("Yes")
          }
          this.correct.push(this.yes_no().at(j).value.correctanswer)
          this.quiz.questionsList.push({
            question: this.yes_no().at(j).value.question,
            points: this.yes_no().at(j).value.points,
            timerperquestion: this.yes_no().at(j).value.timerperquestion,
            correctanswer: this.correct,
            wronganswer: this.wrong

          });
          this.correct = []
          this.wrong = []
        }
        break;
      }
      case "Open_questions": {
        for (let j = 0; j <= this.Open_Questions().length - 1; j++) {
          for (let l = 0; l <= this.Open_Questions().at(j).value.keywords.length - 1; l++) {
            this.correct.push(this.Open_Questions().at(j).value.keywords[l])
          }
          this.quiz.questionsList.push({
            question: this.Open_Questions().at(j).value.question,
            points: this.Open_Questions().at(j).value.points,
            timerperquestion: this.Open_Questions().at(j).value.timerperquestion,
            correctanswer: this.correct,
            wronganswer: this.wrong

          });
          this.correct = []
          this.wrong = []
        }
      }

    }


    this.quizservice.updatequiz(this.idquiz, this.quiz).subscribe(res => {
      Swal.fire({
        title: 'Quis posted successfully !',
        icon: 'success',
        confirmButtonColor: '#07294d',
      }
      )
      this._router.navigate(["."],{ relativeTo: this.ar.parent })
    })
  }
}


