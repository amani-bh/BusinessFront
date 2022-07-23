
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperOrientation } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';

import { map, Observable} from 'rxjs';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import Swal from 'sweetalert2';
import { Quiz } from '../../../Courzelo_Quizz/Shared/entities/Quiz';
import { QuizService } from '../../../Courzelo_Quizz/Shared/services/quiz.service';

@Component({
  selector: 'app-quiz-pertrainee',
  templateUrl: './quiz-pertrainee.component.html',
  styleUrls: ['./quiz-pertrainee.component.css']
})

export class QuizPertraineeComponent implements OnInit {
  quiz:Quiz=new Quiz();
  quizresponse:Quiz=new Quiz();
  quiztmp:Quiz=new Quiz();
  quizqcm:string[]=[];
state:boolean=false;

score!:any;


  idquiz!:string;
verif:number=0;
result:string []= [];
stateaffich:boolean=false;
   currentIndexq!:any;
   temporaryValueq!:any;
   temporaryValueqtmp!:any;
   randomIndexq!:any;
   timeLeft!:number;
   interval:any;
   intervalsound:any;
   fbuilder: FormBuilder=new FormBuilder();
  Quizform!: FormGroup;
    wrong:String[]=[];
    questionformO_Q!: FormGroup;
 
     
   audio = new Audio();
 

  stepperOrientation!: Observable<StepperOrientation>;
  currentuser: any;
  constructor(private quizservice : QuizService,  private tokenService: TokenStorageService,private ar :ActivatedRoute,private _router:Router, breakpointObserver: BreakpointObserver) { 
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));

  }

  ngOnInit(): void {
    this.audio.src = '../../../../assets/sound-quiz/countdown.wav';
    
    this.currentuser = this.tokenService.getUser();
    this.ar.paramMap.subscribe(params => {
      this.idquiz = String(params.get('id'));
     
    });
  
    this.Quizform=this.fbuilder.group({
      answers : ['',[Validators.required]]
    })
    this.questionformO_Q = this.fbuilder.group({
      Open_Questions: this.fbuilder.array([])
    });
    this.quizservice.getquizbyid(this.idquiz).subscribe(res=>{this.quiztmp=res})
    this.quizservice.getquizbyid(this.idquiz).subscribe(res=>{

      
      this.quiz=res;
      this.timeLeft=this.quiz.countperquiz;
    
  
     
      switch(this.quiz.type){
case "MCQ":{
  res.questionsList.map(data=>{
  
    data.correctanswer.map(d=>{data.wronganswer.push(d)})
    data.correctanswer=[]
    this.randomizeanswers(data)
      
    })
    this.randomizequestions(res,this.quiztmp);
 
  
    break;
}
case "Y/N":{
  res.questionsList.map(data=>{
  
    data.wronganswer.push(data.correctanswer[0])
    this.randomizeanswers(data)
     
    })
    this.randomizequestions(res,this.quiztmp);
  
    break;
}
case "SCQ":{
  res.questionsList.map(data=>{
    this.wrong=data.wronganswer;
    data.correctanswer.map(d=>{data.wronganswer.push(d)})
  this.randomizeanswers(data)
    })

    this.randomizequestions(res,this.quiztmp);
   

    break;
}
case "Open_questions":{
  this.randomizequestions(res,this.quiztmp);
  for(let i=0;i<this.quiz.questionsList.length;i++)
    {
      this.Open_Questions().push(this.newOpen_Questions(this.quiz.questionsList[i].question,this.quiz.questionsList[i].points));
  
     }
}
      }

   

  
  }
      
      )
   

  }

  Open_Questions(): FormArray {
    return this.questionformO_Q.get('Open_Questions') as FormArray;
  }
  newOpen_Questions(question:string,points:number): FormGroup {
    return this.fbuilder.group({
      question: [question,],
      points:[points, ],
      correctanswer: ['', ],
    });
  }

  onDatacheckChange(event:any,wrong:string,data:any) {

    if(event.checked==true){
    data.correctanswer.push(wrong)

this.quizresponse.questionsList.push(data)


for(let i=0;i<=this.quizresponse.questionsList.length-1;i++)
{if(this.quizresponse.questionsList[i].question==data.question)
 
{this.verif++;
  if(this.verif>1)
  {
    this.quizresponse.questionsList.splice(i,1);
  }

}}

this.verif=0;}
else if(event.checked==false){

  for(let i=0;i<=this.quizresponse.questionsList.length-1;i++)
   for(let j=0;j<=this.quizresponse.questionsList[i].correctanswer.length-1;j++)
   {
     if(this.quizresponse.questionsList[i].correctanswer[j]==wrong)
{ //si uncheck delete answer
  this.quizresponse.questionsList[i].correctanswer.splice(j,1);}

   }

  }
   

  }

  onDataChange(event:any,data:any) {
   
  data.correctanswer[0]=event.value
   
    this.quizresponse.questionsList.push(data)
 
  for(let i=0;i<=this.quizresponse.questionsList.length-1;i++)
  {if(this.quizresponse.questionsList[i].question==data.question)
   
  {this.verif++;
    if(this.verif>1)
    {
      this.quizresponse.questionsList.splice(i,1);
    }
  }}

this.verif=0;

  }
randomizequestions(res:Quiz,tmp:Quiz){
  this.currentIndexq=res.questionsList.length;
  while (0 !== this.currentIndexq) {

    this.randomIndexq = Math.floor(Math.random() * this.currentIndexq);

    this.currentIndexq-= 1;

    this.temporaryValueq = res.questionsList[this.currentIndexq];
    this.temporaryValueqtmp = tmp.questionsList[this.currentIndexq];
    
    res.questionsList[this.currentIndexq] = res.questionsList[this.randomIndexq];
    tmp.questionsList[this.currentIndexq] = tmp.questionsList[this.randomIndexq];
    res.questionsList[this.randomIndexq] = this.temporaryValueq;
    tmp.questionsList[this.randomIndexq] = this.temporaryValueqtmp;
  }
}
randomizeanswers(answers:any){
  this.currentIndexq=answers.wronganswer.length;
    while (0 !== this.currentIndexq) {
  
      this.randomIndexq = Math.floor(Math.random() * this.currentIndexq);
  
      this.currentIndexq-= 1;
  
      this.temporaryValueq = answers.wronganswer[this.currentIndexq];
      
      answers.wronganswer[this.currentIndexq] = answers.wronganswer[this.randomIndexq];
     
      answers.wronganswer[this.randomIndexq] = this.temporaryValueq;
     
    }
}
 sortfinalresponse(){
  if(this.quizresponse.questionsList.length<this.quiz.questionsList.length)
  {for(let i=0;i<=this.quiz.questionsList.length-1;i++){
 
    if(this.quizresponse.questionsList.indexOf(this.quiz.questionsList[i]) === -1 )     
    {this.quiz.questionsList[i].correctanswer[0]="-";
      this.quizresponse.questionsList.push(this.quiz.questionsList[i]) }
    }}
    this.quizresponse.questionsList.sort((a, b) => (a.question < b.question ? -1 : 1));
 }
   

  sendreponse(type:string){
  this.state=true;
this.audio.pause()
  clearInterval(this.interval)
  
  
    switch(type){
      case "Y/N":{
        this.sortfinalresponse()
        this.quizservice.getqcuqcore(this.idquiz,this.quizresponse,this.currentuser.id).subscribe(res=>{   
          this.score=res;
    
             Swal.fire({
            title: 'time is over  ! score: '+res+'%',
            icon: 'success',
            confirmButtonColor: '#07294d',
          })})
        break;
      }
      case "SCQ":{
       
        this.sortfinalresponse()
      
       
        this.quizservice.getqcuqcore(this.idquiz,this.quizresponse,this.currentuser.id).subscribe(res=>{       
          this.score=res;
         
           Swal.fire({
          title: 'time is over  ! score: '+res+'%',
          icon: 'success',
          confirmButtonColor: '#07294d',
        })})
        break;
      }
      case "MCQ":{
        this.sortfinalresponse()



        this.quizservice.getqcmscore(this.idquiz,this.quizresponse,this.currentuser.id).subscribe(res=>{       
        this.score=res;
         
             Swal.fire({
            title: 'time is over  ! score: '+res+'%',
            icon: 'success',
            confirmButtonColor: '#07294d',
          })})
    
     
   for(let il=0;il<=this.quiztmp.questionsList.length-1;il++)
  {    this.quizqcm=this.quiztmp.questionsList[il].correctanswer;
    
  
  
     this.quiztmp.questionsList[il].correctanswer=[]

     for(let j=0;j<this.quiz.questionsList[il].wronganswer.length;j++)
     {this.quiztmp.questionsList[il].correctanswer.push(this.quiz.questionsList[il].wronganswer[j])}
     
     for(let b=0;b<this.quizqcm.length;b++){
 
      this.quiztmp.questionsList[il].correctanswer.findIndex(x=>x==this.quizqcm[b])
    
    this.quiztmp.questionsList[il].correctanswer[this.quiztmp.questionsList[il].correctanswer.findIndex(x=>x==this.quizqcm[b])]="-"
    }
  
  }
   
    
        break;
      }
      case "Open_questions":{
    
       for(let i=0;i<=this.Open_Questions().length-1;i++){
        this.result.push(this.Open_Questions().at(i).value.correctanswer)
        this.quizresponse.questionsList.push(
          {question:this.Open_Questions().at(i).value.question,
          points:0,
        correctanswer:this.result,
      timerperquestion:0,
    wronganswer:[]})
    this.result=[];
          
          
      }
      this.quizresponse.questionsList.sort((a, b) => (a.question < b.question ? -1 : 1));
   
       this.quizservice.getopen_questioncore(this.idquiz,this.quizresponse,this.currentuser.id).subscribe(res=>{       
       this.score=res
           Swal.fire({
          title: 'time is over  ! score: '+res+'%',
          icon: 'success',
          confirmButtonColor: '#07294d',
        })})
       
     
        this.questionformO_Q.disable();
      
        break;
      }
  
    }
   
}

starttimer(){
 
  
  this.interval = setInterval(() => {
   
    if(this.timeLeft > 0) {
      this.timeLeft--;
      
     if(this.timeLeft<=5 && this.timeLeft>0)
   
   {
    this.intervalsound=setTimeout(() => {
      this.audio.play();
    }, 0);}

    if(this.timeLeft==0 )
    { clearInterval(this.intervalsound);
      
      this.verif=0;
    clearInterval(this.interval);
  
     if(!this.state){
      
      
     this.sendreponse(this.quiz.type) 
  
this.stateaffich=true;


     clearInterval(this.interval);
     }}
   
    }

  },1000)
}

}


