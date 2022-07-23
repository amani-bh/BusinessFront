import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AppState } from '../../Shared/entities/CandidateApp';
import { CandidateAppService } from '../../Shared/services/CandidateApp.service';
import { FileUploadService } from '../../Shared/services/FileUpload.service';
import Swal from "sweetalert2";
import { WebSocketService } from '../../Shared/services/websocket.service';
import { FileUpload } from '../../Shared/entities/FileUpload';

@Component({
  selector: 'app-offer-diag',
  templateUrl: './offer-diag.component.html',
  styleUrls: ['./offer-diag.component.css']
})
export class OfferDiagComponent implements OnInit {

  file:any
  Form!: FormGroup;
  progressInfos: any[] = [];
  message: string[] = [];
  fileInfos?: Observable<any>;

  FileUrl:FileUpload;
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  percentage: number;
  constructor(private uploadService:FileUploadService,private socketService:WebSocketService,private fb: FormBuilder,public dialogRef: MatDialogRef<OfferDiagComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private AppService:CandidateAppService,) { }

  ngOnInit(): void {
    this.Form = this.fb.group({
      offerDoc : ['',  Validators.required],
    })

  }


  AddState(){
    console.log(this.data.message)
    
    var  state= new AppState(null,new Date(),"Job offer",this.data.message.currentState.step+1,0,'',"","",null,false,this.FileUrl.url);
    this.AppService.AddState(state,this.data.message.idCandidateApp).subscribe(res=>{
        
            
            Swal.fire({
              title: 'Offer is send to candidate',
              icon:'success',
              confirmButtonColor: '#07294d'
               })

               this.SendNotif(this.data.message.user.id,"Your application ( "+ this.data.message.idCandidateApp+" )for the job "+this.data.message.job.title+" has been changed ! You have recieved an official offer")
      
          

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
    this.percentage=0;
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




SendNotif(id:any,msg:any){
  this.socketService.Notify(id,msg).subscribe(res=>{
  
  })
  }



}
