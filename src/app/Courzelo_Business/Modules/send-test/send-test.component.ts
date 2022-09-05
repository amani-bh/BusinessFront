import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Quiz } from 'src/app/Courzelo_Quizz/Shared/entities/Quiz';
import { QuizService } from 'src/app/Courzelo_Quizz/Shared/services/quiz.service';
import { CandidateApp, AppState } from '../../Shared/entities/CandidateApp';
import { JobOffers } from '../../Shared/entities/JobOffers';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { JobOffersService } from '../../Shared/services/JobOffers.service';
import { WebSocketService } from '../../Shared/services/websocket.service';

@Component({
  selector: 'app-send-test',
  templateUrl: './send-test.component.html',
  styleUrls: ['./send-test.component.css']
})
export class SendTestComponent implements OnInit {

  currentBusiness:any;
  idJob:any;
  TechTest=[] as Quiz[];
  Form!: FormGroup;
  constructor(private socketService:WebSocketService,public dialogRef: MatDialogRef<SendTestComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private _Activatedroute:ActivatedRoute,private fb: FormBuilder,private quizservice : QuizService, private businesstokenStorage: BusinessTokenStorageService,private jobServices:JobOffersService,private AppService:CandidateAppService) { }

  ngOnInit(): void {
    this.currentBusiness = this.businesstokenStorage.getUser();
    this.idJob=this._Activatedroute.parent?.snapshot.paramMap.get('idJob');
    this.Form = this.fb.group({
      test : [''],
      
    })
    console.log(this.TechTest)
    this.GetTechTestByJob()
  }




  AddState(){
  
    console.log(this.data.message)
    var  state= new AppState(null,new Date(),"test",this.data.message.currentState.step+1,0,'',this.Form.get("test")?.value,"","",false,"","",0);
    this.AppService.AddState(state,this.data.message.idCandidateApp).subscribe(res=>{
      this.closeDialog()
      this.SendNotif(this.data.message.user.id,"Your application ( "+ this.data.message.idCandidateApp+" )for the job "+this.data.message.job.title+" has been changed ! You have a test to pass as soon as possible ")
      
    })

     
     this.AppService.SendMail("asmachebbi222@gmail.com","dear candidate, <br> you have received a test to pass .<br> here is the link  http://localhost:4200/PassTest/"+this.Form.get("test")?.value ).subscribe(res=>{
      console.log("ok")
     })
     
    
  }




  GetTechTestByJob(){
    var i=0
    this.jobServices.GetJobById(this.data.message.job.idJob).subscribe((res:JobOffers)=>{
      this.TechTest=[] as Quiz[]
      if(res.idTest){
        res.idTest.map(e=>{
          this.quizservice.getquizbyid(e).subscribe(r=>{
            this.TechTest.push(r)
             i++
             /*if(i==res.idTest.length){
                console.log(this.TechTest)
             }*/
           })
          }) }
      })
    
      
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

  

  public hasError = (controlName: string, errorName: string) =>{
  
    return this.Form.controls[controlName].invalid ;
  }


  SendMail(mail:any,id:any)
  {
     var content="dear candidate ,<br> you have received a test to pass  http://localhost:4200/quizdetail/"+id
     this.AppService.SendMail(mail,content)
  }
  

  SendNotif(id:any,msg:any){
    this.socketService.Notify(id,msg).subscribe(res=>{
    
    })
    }
}
