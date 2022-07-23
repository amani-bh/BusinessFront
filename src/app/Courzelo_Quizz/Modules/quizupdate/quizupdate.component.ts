import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from '../../Shared/entities/Quiz';
import { QuizService } from '../../Shared/services/quiz.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-quizupdate',
  templateUrl: './quizupdate.component.html',
  styleUrls: ['./quizupdate.component.css']
})
export class QuizupdateComponent implements OnInit {

  visible = true;
  selectable1 = true;
  removable = true;
  addOnBlur = true;

  fb: FormBuilder = new FormBuilder();
  questionformY_N!: FormGroup;
  questionformO_Q!: FormGroup;
  questionformQCU!: FormGroup;
  questionformQCM!: FormGroup;
  Quizform!: FormGroup;
  quiz: Quiz = new Quiz();
  selected!: string;
  selectable = false;
  idquiz!: string;
  state = 0;
  state1 = 0;
  state3 = 0;
  types: string[] = ['MCQ', 'SCQ', 'Y/N', 'Open_questions'];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  correct: string[] = [];
  keys: string[] = [];
  wrong: string[] = [];


  constructor(private ar: ActivatedRoute, private quizservice: QuizService, private _router: Router,private readonly changeDetectorRef: ChangeDetectorRef) { 
    }
    ngAfterViewChecked(): void {
      this.changeDetectorRef.detectChanges();
    }
  ngOnInit(): void {
    this.ar.paramMap.subscribe(params => {
      this.idquiz = String(params.get('id'));
    });
    this.quizservice.getquizbyid(this.idquiz).subscribe(res=>{this.quiz=res;this.setField();console.log(res)});


    //this.quizservice.getquizbyid(this.idquiz).subscribe(res => this.quiz = res);
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
    this.Quizform=this.fb.group({
     
      title : ['',[Validators.required]],   
      description : ['',[Validators.required]],    
      limitdate : ['',[Validators.required]],  
      countperquiz : ['',[Validators.required]],
      evaluationmodel : ['',[Validators.required]],
    
     
        })
  }

  public hasError (controlName:string, errorName:string) {

    this.Quizform.markAsTouched();
    return this.Quizform.controls[controlName].hasError(errorName);
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
      keywords: [[],],
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
      timerperquestion: [1, Validators.required],
      wrongsanwers: this.fb.array([
      ])
    });
  }
  setField(){
    this.Quizform.get("title")?.setValue( this.quiz.title)
    this.Quizform.get("description")?.setValue( this.quiz.description)
    this.Quizform.get("limitdate")?.setValue( this.quiz.limitdate)
    this.Quizform.get("countperquiz")?.setValue( this.quiz.countperquiz)
    this.Quizform.get("evaluationmodel")?.setValue( this.quiz.evaluationmodel)
  
if(this.quiz.type=='SCQ')
{//this.state=0;
 this.state=this.quiz.questionsList.length
 
 if(this.quiz.questionsList)
   {for(let i=0;i<this.quiz.questionsList.length;i++)
  {this.qcu().push(this.newqcu());
    this.qcu().at(i).get("question")?.setValue(this.quiz.questionsList[i].question);
    this.qcu().at(i).get("points")?.setValue(this.quiz.questionsList[i].points);
    this.qcu().at(i).get("correct")?.setValue(this.quiz.questionsList[i].correctanswer[0]);
    this.qcu().at(i).get("wrong")?.setValue(this.quiz.questionsList[i].wronganswer[0]);

    for(let j=0;j<this.quiz.questionsList[i].wronganswer.length-1;j++){

  this.addqcuwrong(i)
  
  this.wrongqcu(i).at(j).get("wrong")?.setValue(this.quiz.questionsList[i].wronganswer[j+1])

  console.log(this.wrongqcu(i).at(j).get("wrong"))

    }

    
  }
      

  }
this.state3=1;
}

  else if(this.quiz.type=='MCQ')
  {
this.state3=this.quiz.questionsList.length
    for(let i=0;i<this.quiz.questionsList.length;i++)
    {
      this.qcms().push(this.newqcm());
      this.qcms().at(i).get("question")?.setValue(this.quiz.questionsList[i].question);
      this.qcms().at(i).get("points")?.setValue(this.quiz.questionsList[i].points);
      this.qcms().at(i).get("correct")?.setValue(this.quiz.questionsList[i].correctanswer[0]);
      this.qcms().at(i).get("wrong")?.setValue(this.quiz.questionsList[i].wronganswer[0]);
      for(let j=0;j<this.quiz.questionsList[i].correctanswer.length-1;j++){//wronganswer

        this.addqcmcorrect(i)
        this.correctqcm(i).at(j).get("correct")?.setValue(this.quiz.questionsList[i].correctanswer[j+1])
      
       // console.log(this.wrongqcu(i).at(j).get("wrong"))
      
          }
          for(let a=0;a<this.quiz.questionsList[i].wronganswer.length-1;a++){

            this.addqcmwrong(i)
            this.wrongqcm(i).at(a).get("wrong")?.setValue(this.quiz.questionsList[i].wronganswer[a+1])
          
           // console.log(this.wrongqcu(i).at(j).get("wrong"))
          
              }
  }
}
/* question: ['', Validators.required],
      points: ['', Validators.required],
      timerperquestion: ['1', Validators.required],
      keywords: this.fb.array([]),*/
else if(this.quiz.type=='Open_questions')
{this.state=this.quiz.questionsList.length
this.state1=1;
  
  for(let i=0;i<this.quiz.questionsList.length;i++)
  { 
    this.Open_Questions().push(this.newOpen_Questions());
    this.Open_Questions().at(i).get("question")?.setValue(this.quiz.questionsList[i].question);
    this.Open_Questions().at(i).get("points")?.setValue(this.quiz.questionsList[i].points);
    this.Open_Questions().at(i).get("timerperquestion")?.setValue(this.quiz.questionsList[i].timerperquestion);
    console.log(this.Open_Questions().at(i).get("keywords"))
    
    for(let a=0;a<this.quiz.questionsList[i].correctanswer.length;a++){
console.log(    this.Open_Questions().at(i).value.keywords)
this.Open_Questions().value[i].keywords.push(this.quiz.questionsList[i].correctanswer[a])

   }
  
  }
}

else if(this.quiz.type=='Y/N')
{
  for(let i=0;i<this.quiz.questionsList.length;i++)
  { this.state++;
    this.yes_no().push(this.newyes_no());
    this.yes_no().at(i).get("question")?.setValue(this.quiz.questionsList[i].question);
    this.yes_no().at(i).get("points")?.setValue(this.quiz.questionsList[i].points);
    this.yes_no().at(i).get("timerperquestion")?.setValue(this.quiz.questionsList[i].timerperquestion);
    this.yes_no().at(i).get("correctanswer")?.setValue(this.quiz.questionsList[i].correctanswer[0]);
    
   
  
  }
}
  }

  addqcu() {
    this.state3=0;
    this.qcu().push(this.newqcu());

    
    this.state++;//qcu wrong
//qcu question
  }

  removeqcu(qcuindex: number) {
    this.qcu().removeAt(qcuindex);
    this.state--; //qcuquestion
    this.state3=1;
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
    this.state3++;
  }

  removeqcuwrong(qcuindex: number, qcuwrongindex: number) {
    this.wrongqcu(qcuindex).removeAt(qcuwrongindex);
    this.state3--;
  }
  //fin qcu

  post() {
    this.quiz.title=this.Quizform.get("title")?.value;
    this.quiz.description=this.Quizform.get("description")?.value;
    this.quiz.limitdate=this.Quizform.get("limitdate")?.value;
    this.quiz.countperquiz=this.Quizform.get("countperquiz")?.value;
    this.quiz.evaluationmodel=this.Quizform.get("evaluationmodel")?.value;
    this.quiz.questionsList=[]
    switch (this.quiz.type) {


      case "SCQ": {
    

console.log(this.quiz.questionsList)
        for (let j = 0; j <= this.qcu().length - 1; j++) {
          this.wrong.push(this.qcu().at(j).value.wrong);
          for (let i = 0; i <= this.wrongqcu(j).length - 1; i++) {
            this.wrong.push(this.wrongqcu(j).at(i).value.wrong);
          }
          this.correct.push(this.qcu().at(j).value.correct)
          console.log(this.qcu().at(j).value.question)
          this.quiz.questionsList.push({
            question: this.qcu().at(j).value.question,
            points: this.qcu().at(j).value.points,
            timerperquestion: this.qcu().at(j).value.timerperquestion,
            correctanswer: this.correct,
            wronganswer: this.wrong
          })
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
        console.log(this.quiz.questionsList)
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
        console.log(this.quiz.questionsList)
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
console.log(this.quiz)
    this.quizservice.updatequiz(this.idquiz, this.quiz).subscribe(res => {
      Swal.fire({
        title: 'Quis updated successfully !',
        icon: 'success',
        confirmButtonColor: '#07294d',
      }
      )
      this._router.navigateByUrl("Quizmanagement")
    })
  }
}
