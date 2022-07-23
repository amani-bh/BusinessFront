import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppState } from '../../Shared/entities/CandidateApp';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { WebSocketService } from '../../Shared/services/websocket.service';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-interview-diag',
  templateUrl: './interview-diag.component.html',
  styleUrls: ['./interview-diag.component.css']
})
export class InterviewDiagComponent implements OnInit {
  Form!: FormGroup;
  currentBusiness:any
  constructor( private socketService:WebSocketService,private router: Router,private businesstokenStorage: BusinessTokenStorageService,private fb: FormBuilder,public dialogRef: MatDialogRef<InterviewDiagComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private AppService:CandidateAppService,) { }

  ngOnInit(): void {
    this.currentBusiness = this.businesstokenStorage.getUser()
    this.Form = this.fb.group({
      roomName : [''],
      interviewDate:['', Validators.required],
    })

  }


  AddState(){
    this.CreateMeet(this.Form.get("roomName")?.value,this.currentBusiness.firstName+this.currentBusiness.lastName)
    console.log(this.data.message)
    var  state= new AppState(null,new Date(),"interview",this.data.message.currentState.step+1,0,'',"","meet.jit.si/"+this.Form.get("roomName")?.value,this.Form.get('interviewDate')?.value,false,"");
    this.AppService.AddState(state,this.data.message.idCandidateApp).subscribe(res=>{
      this.SendNotif(this.data.message.user.id,"Your application ( "+ this.data.message.idCandidateApp+" )for the job "+this.data.message.job.title+" has been changed ! An interview has been set by the recruteur")
      
      this.closeDialog()
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

  
  Reset() {
    this.Form.reset(); 
}

public hasError = (controlName: string, errorName: string) =>{
  
  return this.Form.controls[controlName].invalid ;
}



//MEET jitsi
domain: string = "meet.jit.si";
room: any;
options: any;
api: any;
user: any;

// For Custom Controls
isAudioMuted = false;
isVideoMuted = false;

CreateMeet(roomName:String,userName:String){
  this.room = roomName; // set your room name
  this.user = {
            name: userName // set your username
        }

  this.options = {
          roomName: this.room,
          width: 0,
          height: 0,
          configOverwrite: { prejoinPageEnabled: false,defaultLanguage: "en" },
          interfaceConfigOverwrite: {
              // overwrite interface properties
          },
          
          userInfo: {
              displayName: this.user.name
          }
      }

 //this.api = new JitsiMeetExternalAPI("meet.jit.si", this.options);
  

}


SendNotif(id:any,msg:any){
  this.socketService.Notify(id,msg).subscribe(res=>{
  
  })
  }

}
