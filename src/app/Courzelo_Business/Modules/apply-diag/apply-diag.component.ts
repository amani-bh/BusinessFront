import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { AppState, CandidateApp } from '../../Shared/entities/CandidateApp';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import Swal from "sweetalert2";
import { TestsService } from '../../Shared/services/Tests.service';
import { PrehiringTests, Question } from '../../Shared/entities/PrehiringTests';
import { WebSocketService } from '../../Shared/services/websocket.service';
import { FileUploadService } from '../../Shared/services/FileUpload.service';
import { FileUpload } from '../../Shared/entities/FileUpload';
import { OtherTest, QuestionsOtherTest } from '../../Shared/entities/OtherTest';
import { OtherTestService } from '../../Shared/services/other-test.service';
import { DomSanitizer} from '@angular/platform-browser';
@Component({
  selector: 'app-apply-diag',
  templateUrl: './apply-diag.component.html',
  styleUrls: ['./apply-diag.component.css']
})
export class ApplyDiagComponent implements OnInit {
  isLeftVisible = true;
  file:any
  Form!: FormGroup;
  Form2!:FormGroup
  Form3!:FormGroup
  job!:JobOffers
  state= new AppState(null,new Date(),"pending",1,0,'',"",'',null,false,"","",0);
  app=new CandidateApp(null,new Date(),[],"",[],this.state,this.job,null) ;
  currentUser: any;
  isLoggedIn = false;
  prehiringTest!:PrehiringTests;
  respTest!:PrehiringTests;

  otherTest!:OtherTest;
  respOtherTest!:OtherTest;

  FileUrl:FileUpload;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  clicked=false
  constructor(private sanitization:DomSanitizer,private uploadService:FileUploadService,private socketService:WebSocketService,private testsService:TestsService,private otherTestsService:OtherTestService,private token: TokenStorageService,private fb: FormBuilder,public dialogRef: MatDialogRef<ApplyDiagComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private AppService:CandidateAppService,) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
    this.currentUser = this.token.getUser();
    this.clicked=false

    this.Form = this.fb.group({
      option: [''],
      cv : [''],
      
    })

    this.Form2=this.fb.group({
      questions: this.fb.array([]),
    })
    this.Form3=this.fb.group({
      questions: this.fb.array([]),
    })

    
  }

  Questions() : FormArray {
    return this.Form2.get("questions") as FormArray
  }


  newQuestion(): FormGroup {
    return this.fb.group({
      questionLabel : ['', Validators.required],
      questionId : ['', Validators.required],
      responses:this.fb.array([]) , 
    })
    
  }

  addMore() {
    this.Questions().push(this.newQuestion());
    this.addMoreResponse(this.Questions().length-1);
  }


  Responses(i:any) : FormArray {
    var  q= this.Form2.get("questions") as FormArray
    return q.at(i).get("responses") as FormArray
    
  }

  newResponse():FormGroup {
    return this.fb.group({
      label : this.fb.array([])
    })
  }
  addMoreResponse(i:any) {
    //console.log(this.newFormGroup.get("questions"))
    this.Responses(i).push(new FormControl(false))
    
    
  }
 NewQ():Question{
   return new Question(0,'',[],[],0,'',0)
 }
 
  CheckResponse(e:any,i:number,){
    console.log(e)
     
     
    if ((e.checked)){
      //t.questions=[]
      this.respTest.questions[i].correctResponses.push(e.source.value);
    }
    else if ((!e.checked)) {
      var j=this.respTest.questions[i].correctResponses.indexOf(e.source.value)
      this.respTest.questions[i].correctResponses.splice(j,1)
    }
    
   
  
  
}
  
  
  

  AddApp(){
    this.app.candidateState.push(this.state)

    if(this.FileUrl){this.app.cv=this.FileUrl.url}
    this.AppService.PostApp(this.app,this.data.message.idJob,this.currentUser.id).subscribe(res => 
      { 
                
            Swal.fire({
              title: 'Job application has been send successufly',
              icon:'success',
              confirmButtonColor: '#07294d'
               }).then((result) => {
                if (result.isConfirmed) {
                  this.closeDialog()
                }})

                this.SendNotif(res.job.business.idBusiness,"A new application for the job "+res.job.title+" has been submited")
        
          
              }
        
       ,
      err=>
      {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! ' + err.error.text,
          
        })
      })

  }

 

  AddAppPrehiring(){
    if(this.respTest!=null){
      this.testsService.TestScore(this.prehiringTest.idPrehiringTest,this.respTest).subscribe(res=>{
        this.state.score=res
        this.state.idPrehiringTest=this.prehiringTest.idPrehiringTest
        
      })
    }
    if(this.respOtherTest!=null){
      this.otherTestsService.TestScore(this.otherTest.idOtherTest,this.respOtherTest).subscribe(res=>{
        this.state.otherTestScore=res
        this.state.idOtherTest=this.otherTest.idOtherTest
      })
    }
   
    this.AddApp()
    this.closeDialog()

  }


  // AddAppOtherTest(){
  //   this.otherTestsService.TestScore(this.otherTest.idOtherTest,this.respOtherTest).subscribe(res=>{
  //     console.log(res)
  //     this.state.score=res
  //     this.state.idOtherTest=this.otherTest.idOtherTest
  //     this.AddApp()
  //     this.closeDialog()
  //   })


  // }


  GetPrehiringTestByid(id:any){
    if(id!=null){
      this.testsService.GetTestById(id).subscribe(res=>{
        this.prehiringTest=res;
        this.respTest=this.prehiringTest;
  
        if(this.prehiringTest.questions.length!=0){
          for(let i=0;i<this.prehiringTest.questions.length;i++){
           this.Questions().push(this.newQuestion());
           this.Questions().at(i).get("questionLabel")?.setValue(this.prehiringTest.questions[i].questionLabel);
           this.Questions().at(i).get("questionId")?.setValue(this.prehiringTest.questions[i].questionId);
  
           for(let j=0;j<this.prehiringTest.questions[i].falseResponses.length;j++){
            this.addMoreResponse(i);
            this.Responses(i).at(j).setValue(this.prehiringTest.questions[i].falseResponses[j])
          }
  
          for(let j=this.prehiringTest.questions[i].falseResponses.length;j<this.prehiringTest.questions[i].correctResponses.length+this.prehiringTest.questions[i].falseResponses.length;j++){
            this.addMoreResponse(i);
            this.Responses(i).at(j).setValue(this.prehiringTest.questions[i].correctResponses[(j-this.prehiringTest.questions[i].falseResponses.length)])  
          }
    
        }
      
      }
  
      this.respTest.questions.forEach(e=>{
        e.correctResponses=[]
        e.falseResponses=[]
      })
      })
  
    }
  
  }


  GetOtherTestByid(id:any){
    if(id!=null){
      this.otherTestsService.GetTestById(id).subscribe(res=>{
        this.otherTest=res;
        this.respOtherTest=this.otherTest;
  
        if(this.otherTest.questions.length!=0){
          for(let i=0;i<this.otherTest.questions.length;i++){
           this.otherQuestions().push(this.newOtherQuestion());
           this.otherQuestions().at(i).get("questionLabel")?.setValue(this.otherTest.questions[i].questionLabel);
           this.otherQuestions().at(i).get("questionId")?.setValue(this.otherTest.questions[i].questionId);
           this.otherQuestions().at(i).get("categoryQuestion")?.setValue(this.otherTest.questions[i].categoryQuestion);
  
           for(let j=0;j<this.otherTest.questions[i].falseResponses.length;j++){
            this.addMoreOtherResponse(i);
            this.otherResponses(i).at(j).setValue(this.otherTest.questions[i].falseResponses[j])
          }
  
          for(let j=this.otherTest.questions[i].falseResponses.length;j<this.otherTest.questions[i].correctResponses.length+this.otherTest.questions[i].falseResponses.length;j++){
            this.addMoreOtherResponse(i);
            this.otherResponses(i).at(j).setValue(this.otherTest.questions[i].correctResponses[(j-this.otherTest.questions[i].falseResponses.length)])  
          }
    
        }
      
      }
  
      this.respOtherTest.questions.forEach(e=>{
        e.correctResponses=[]
        e.falseResponses=[]
      })
      })
    }
   
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


  
  closeDialog() {
    this.dialogRef.close(false);
    }

  
  Reset() {
    this.Form.reset(); 
}

public hasError = (controlName: string, errorName: string) =>{
  return this.Form.controls[controlName].invalid ;
}



async onFileChanged(event:any) {
  this.selectedFiles = event.target.files;
  this.upload()
  
}



upload(){
    const file = this.selectedFiles.item(0) as File;
    this.selectedFiles = undefined!;
    this.currentFileUpload = new FileUpload(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
      percentage => {
      this.percentage = Math.round(percentage); 
      this.FileUrl=this.currentFileUpload
      
      
    },
      (error: any) => {
      console.log(error);
    }
  );
}


/*onFileSelect(event:Event) {
  const file = (event.target as HTMLInputElement).files?.item(0);   
  this.file=file;
  
  console.log(this.file)
  //if (event.target.files.length > 0) {
   // const file = event.target.files[0];
    //this.Form.get('cv')?.setValue(file);
    //console.log(event)
   // console.log(this.Form.get('cv')?.value)
  //}
}
*/

SendNotif(id:any,msg:any){
  this.socketService.Notify(id,msg).subscribe(res=>{
  
  })
  }


  check():any{
    if((this.percentage==100 && this.Form.get('option')?.value==true) || ((this.Form.get('option')?.value==false && this.percentage!=100))){
      return true
    }
    else if(this.percentage<100 && this.Form.get('option')?.value==true) 
    {return false}
    
  }

  
  otherQuestions() : FormArray {
    return this.Form3.get("questions") as FormArray
  }


  newOtherQuestion(): FormGroup {
    return this.fb.group({
      questionLabel : ['', Validators.required],
      questionId : ['', Validators.required],
      categoryQuestion: ['', Validators.required],
      responses:this.fb.array([]) , 
    })
    
  }

  addMoreOther() {
    this.otherQuestions().push(this.newOtherQuestion());
    this.addMoreOtherResponse(this.otherQuestions().length-1);
  }


  otherResponses(i:any) : FormArray {
    var  q= this.Form3.get("questions") as FormArray
    return q.at(i).get("responses") as FormArray
    
  }

  newOtherResponse():FormGroup {
    return this.fb.group({
      label : this.fb.array([])
    })
  }
  addMoreOtherResponse(i:any) {
    //console.log(this.newFormGroup.get("questions"))
    this.otherResponses(i).push(new FormControl(false))
    
    
  }
 NewOQ():QuestionsOtherTest{
   return new QuestionsOtherTest(0,'',[],[],0,'','',0)
 }
 
  CheckOtherResponse(e:any,i:number,){
     
     
    if ((e.checked)){
      //t.questions=[]
      this.respOtherTest.questions[i].correctResponses.push(e.source.value);
    }
    else if ((!e.checked)) {
      var j=this.respOtherTest.questions[i].correctResponses.indexOf(e.source.value)
      this.respOtherTest.questions[i].correctResponses.splice(j,1)
    }
    
   
  
  
}
  
  
  

  AddOtherApp(){
    this.app.candidateState.push(this.state)
    
    if(this.FileUrl){this.app.cv=this.FileUrl.url}
    this.AppService.PostApp(this.app,this.data.message.idJob,this.currentUser.id).subscribe(res => 
      { 
                
            Swal.fire({
              title: 'Job application has been send successufly',
              icon:'success',
              confirmButtonColor: '#07294d'
               }).then((result) => {
                if (result.isConfirmed) {
                  this.closeDialog()
                }})

                this.SendNotif(res.job.business.idBusiness,"A new application for the job "+res.job.title+" has been submited")
        
          
              }
        
       ,
      err=>
      {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! ' + err.error.text,
          
        })
      })

  }
  clearUrl(url:any){
 
    return   this.sanitization.bypassSecurityTrustUrl(url);  
  
  
  }
}
