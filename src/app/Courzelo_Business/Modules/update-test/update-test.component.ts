import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TestsService } from '../../Shared/services/Tests.service';

import Swal from "sweetalert2";
import { Question, PrehiringTests } from '../../Shared/entities/PrehiringTests';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-update-test',
  templateUrl: './update-test.component.html',
  styleUrls: ['./update-test.component.css']
})
export class UpdateTestComponent implements OnInit {
  
  newFormGroup!:FormGroup;
  idTest:any;
  questions!:Question[];
  public thetest:any;
  @ViewChild("stepper", { static: false }) stepper!: MatStepper;

  
  
  constructor(private _location: Location,private testsService:TestsService,private fb: FormBuilder,private _Activatedroute:ActivatedRoute) 
  { }

   ngOnInit() {
    this.idTest=this._Activatedroute.snapshot.paramMap.get("id");
    this.newFormGroup=this.fb.group({
      title : ['', Validators.required],
      creationDate: [new Date(), Validators.required],
      intro: ['', ],
      randomOrder:[],
      questions: this.fb.array([]) 
    })


    
    
    this.GetTest().subscribe(()=>{
      this.SetField();
    })
    
    
    
    
  }

  GetTest():any{
    return this.testsService.GetTestById(this.idTest).pipe(map(data => {
        this.thetest = data;
      }));
    
  }


  
  Questions() : FormArray {
    return this.newFormGroup.get("questions") as FormArray
  }


  newQuestion(): FormGroup {
    return this.fb.group({
      questionId : [''],
      questionLabel : ['', Validators.required],
      falseResponses: ['', ],
      correctResponses: ['', ],
      score: [10, Validators.required],
      time: [1, Validators.required],
      typeQ:['', ],
      responses:this.fb.array([]) , 
    })
    
  }

  addMore() {
    this.Questions().push(this.newQuestion());
    this.addMoreResponse(this.Questions().length-1);
  }

  removeQuestion(i:number) {
    this.DeleteQuestion(this.Questions().at(i).get("questionId")?.value)
    this.Questions().removeAt(i);
    
    
    
  }


  Responses(i:any) : FormArray {
    var  q= this.newFormGroup.get("questions") as FormArray
    return q.at(i).get("responses") as FormArray
    
  }

  newResponse():FormGroup {
    return this.fb.group({
      state : [false, Validators.required],
      label : [, Validators.required],
    })
  }
  addMoreResponse(i:any) {
    //console.log(this.newFormGroup.get("questions"))
    this.Responses(i).push(this.newResponse())
    
    
  }
  removeResponse(i:any,j:number) {
    this.Responses(i).removeAt(j);
   console.log( this.Responses(i))

    
    
  }
  


  SetField(){
    this.newFormGroup.get("title")?.setValue(this.thetest.title);
    this.newFormGroup.get("creationDate")?.setValue(this.thetest.creationDate);
    this.newFormGroup.get("deadline")?.setValue(this.thetest.deadline);
    this.newFormGroup.get("level")?.setValue(this.thetest.level);
    this.newFormGroup.get("intro")?.setValue(this.thetest.intro);
    this.newFormGroup.get("type")?.setValue(this.thetest.type);
    this.newFormGroup.get("openDate")?.setValue(this.thetest.openDate);
    this.newFormGroup.get("closeDate")?.setValue(this.thetest.closeDate);
    this.newFormGroup.get("indefinitDate")?.setValue(this.thetest.indefinitDate);
    this.newFormGroup.get("randomOrder")?.setValue(this.thetest.randomOrder);
    
    this.newFormGroup.get("idBusiness")?.setValue(this.thetest.idBusiness);
   
   if(this.thetest.questions){
      for(let i=0;i<this.thetest.questions.length;i++){
       this.Questions().push(this.newQuestion());
       this.Questions().at(i).get("questionId")?.setValue(this.thetest.questions[i].questionId);
       this.Questions().at(i).get("questionLabel")?.setValue(this.thetest.questions[i].questionLabel);
       this.Questions().at(i).get("score")?.setValue(this.thetest.questions[i].score);
       this.Questions().at(i).get("time")?.setValue(this.thetest.questions[i].time);
       this.Questions().at(i).get("typeQ")?.setValue(this.thetest.questions[i].typeQ);

       this.Questions().at(i).get("correctResponses")?.setValue(this.thetest.questions[i].correctResponses);
       this.Questions().at(i).get("falseResponses")?.setValue(this.thetest.questions[i].falseResponses);
       
       for(let j=0;j<this.thetest.questions[i].falseResponses.length;j++){
        this.addMoreResponse(i);
        this.Responses(i).at(j).get("label")?.setValue(this.thetest.questions[i].falseResponses.at(j))
        this.Responses(i).at(j).get("state")?.setValue(false)
        
      }
      
      for(let j=this.thetest.questions[i].falseResponses.length;j<this.thetest.questions[i].correctResponses.length+this.thetest.questions[i].falseResponses.length;j++){
        this.addMoreResponse(i);
        this.Responses(i).at(j).get("label")?.setValue(this.thetest.questions[i].correctResponses.at(j-this.thetest.questions[i].falseResponses.length))
        this.Responses(i).at(j).get("state")?.setValue(true)
      }

       
       
      
     
       
      
    }
  }
   
    
  }
  
   

  upd(){
    if(this.newFormGroup.invalid){
      
      for(let i=0;i<this.Questions().length;i++){
        this.validateAllFormFields(this.Questions().at(i) as FormGroup);
     } 
    }
    else if(this.newFormGroup.valid && this.VerifyAllQ()){
      for(let i=0;i<this.Questions().length;i++){
        this.Questions().at(i).get("correctResponses")?.setValue([]);
        this.Questions().at(i).get("falseResponses")?.setValue([]);

        for(let j=0;j<this.Questions().at(i).get('responses')?.value.length;j++){
         if(this.Questions().at(i).get('responses')?.value.at(j).state==true){
          this.Questions().at(i).get('correctResponses')?.value.push(this.Questions().at(i).get('responses')?.value.at(j).label)
          console.log(this.Questions().at(i).get('correctResponses')?.value)
         }
        
        else{
          this.Questions().at(i).get('falseResponses')?.value.push(this.Questions().at(i).get('responses')?.value.at(j).label)
          console.log(this.Questions().at(i).get('falseResponses')?.value)

        }
      }
      }

   
        //this.newFormGroup.get('correctResponses')?.reset(null);
        
    console.log(this.newFormGroup.get('questions')?.value)
    for(let i=0; i< this.newFormGroup.get('questions')?.value.length;i++){
      
      for(let j=0;j<this.newFormGroup.get('questions')?.value.at(i).responses;j++){
      if(this.newFormGroup.get('questions')?.value.at(i).responses.at(j).state===true)
      {
        this.newFormGroup.get('questions')?.value.at(i).correctResponses.setValue(null); 
        this.newFormGroup.get('questions')?.value.at(i).correctResponses.push(this.newFormGroup.get('questions')?.value.at(i).responses.at(j).label)
        
      }
      else if(this.newFormGroup.get('questions')?.value.at(i).responses.at(j).state===false)
      {
        this.newFormGroup.get('questions')?.value.at(i).falseResponses.reset();
        this.newFormGroup.get('questions')?.value.at(i).falseResponses.push(this.newFormGroup.get('questions')?.value.at(i).responses.at(j).label)
      }


    }
  }
  
       console.log(this.newFormGroup.get('questions')?.value)
      this.testsService.PutTest(this.idTest,this.newFormGroup.value).subscribe((res) => {
      Swal.fire({
        title: 'Test updated successfully',
        icon:'success',
        confirmButtonColor: '#07294d'
         }).then((result)=>{
          if (result.isConfirmed){
           setTimeout(() => {
             this.GetQuestion(this.idTest);    
             this.stepper.next();
         }, 0);
          }
        })
      
         
     
     
    }, (error) => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! ' + error,
        
      })
  
 } )
}
    }
    
  

  GetQuestion(idTest:any){
    this.testsService.GetQuestions(idTest).subscribe(data=>{
      this.questions=data;
        },err=>{
       console.log(err);
     })

  }
  DeleteQuestion(questionId:any){
    this.testsService.DeleteQuestions(this.idTest,questionId).subscribe(res=>{
      this.GetQuestion(this.idTest);
    }
      )
    }



    
    validateAllFormFields(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach(field => {
        //console.log(field);
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
    }
  
  
  Reset(form:any) {
    
    form.reset();
    
}


verifFalse(q:any):boolean{
  let nbC=0
  let nbF=0


  for(let i=0 ; i<q.value.responses.length;i++)
  {
    if(q.value.responses.at(i).state==true){nbC++}
    else if(q.value.responses.at(i).state==false){nbF++}
  }
  if( nbF>0 ){ return true }
  else {return  false}
}

verifMulti(q:any):boolean{
  let nbC=0
  let nbF=0


  for(let i=0 ; i<q.value.responses.length;i++)
  {
    if(q.value.responses.at(i).state==true){nbC++}
    else if(q.value.responses.at(i).state==false){nbF++}
  }
  if(q.value.typeQ=="Multiple choice" &&  nbC>1 && nbF>0 ){ return true }
  else {return  false}
}

verifSingle(q:any):boolean{
  let nbC=0
  let nbF=0

   console.log(q)
  for(let i=0 ; i<q.value.responses.length;i++)
  {
    if(q.value.responses.at(i).state==true){nbC++}
    else if(q.value.responses.at(i).state==false){nbF++}
  }
  if(q.value.typeQ=="Single choice" && nbC==1 && nbF>0 ){ return true }
  else {return  false}
}


VerifyAllQ():boolean{
  
  var nbT=0
  //console.log(this.Questions().controls[0].value)
  for(let question of this.Questions().controls )
  {
    if ( (this.verifSingle(question )  && (question.value.typeQ=="Single choice" ) && this.verifFalse(question)))
    {
      nbT++
      
    }
    else if (this.verifMulti(question)  && (question.value.typeQ=="Multiple choice" ) && this.verifFalse(question) )

    {
      nbT++
    }
    
    
  }

  if(nbT==this.Questions().length){return true}
  else return false

  
}


shuffle(list:Array<any>) {
  return list.reduce((p, n) => {
    const size = p.length;
    const index = Math.trunc(Math.random() * (size -1));
    p.splice(index, 0, n);
    return p;
  }, []);
}


backClicked() {
  this._location.back();
}

   
  }

