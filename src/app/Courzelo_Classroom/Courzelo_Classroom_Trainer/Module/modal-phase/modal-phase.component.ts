import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { th } from 'date-fns/locale';
import { FileUpload } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/file';
import { Phase } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Phase';
import { Section } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Section';
import { FileUploadService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/file-upload.service';
import { PhaseService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/phase.service';
import { SectionService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/section.service';


@Component({
  selector: 'app-modal-phase',
  templateUrl: './modal-phase.component.html',
  styleUrls: ['./modal-phase.component.css']
})
export class ModalPhaseComponent implements OnInit {
phase= new Phase()
A!:any
selectedFile!:File
selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;
  sections!:Section[]
file = new File(["images"], "images.png", {
  type: "image/png",
});
  constructor(public router: Router, 
    private route: ActivatedRoute, 
    private diag: MatDialog,  
    private dialogRef: MatDialogRef<ModalPhaseComponent>,
    private servicePhase:PhaseService,
    private storage: AngularFireStorage,
    private uploadService: FileUploadService,
    public sectionService:SectionService) { }

  ngOnInit(): void {
    let e=localStorage.getItem("e")
    if(e==='0'){
this.A="Add"
    }
    if(e==='1'){
      this.A="Update" 
      let id=localStorage.getItem("idPhase")
      this.servicePhase.getPhaseById(id).subscribe(res=>{
        this.phase=res

       
      })
    }

  
  }
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }
  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      //this.selectedFiles = undefined;
      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          (percentage:any) => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }
  
addPhase(){
  let e=localStorage.getItem("e")
  if(e==='0'){
let id=localStorage.getItem("idSection")
let idF= localStorage.getItem("idFormation1")
const uploadImageData = new FormData();



if(this.selectedFiles==null){
      
  // uploadImageData.append('imageFile',this.file );
   this.phase.typefile = null;
   
   }
   else {
     const filePath = `${this.uploadService.basePath}/${this.currentFileUpload?.file.name}`;
   const storageRef = this.storage.ref(filePath);
    // uploadImageData.append('imageFile',this.selectedFile );
      storageRef.getDownloadURL().subscribe(d => {this.phase.typefile = d;
       const user=this.phase;
   uploadImageData.append('user',JSON.stringify(user));
   
     this.servicePhase.addPhase(id,uploadImageData).subscribe(res=>{
       localStorage.setItem("idSection","")
       
       this.getSectionByIdFormation()
       })
   }
     );
     
   }
}
if(e==='1'){
  const uploadImageData = new FormData();
  const filePath = `${this.uploadService.basePath}/${this.currentFileUpload?.file.name}`;
  const storageRef = this.storage.ref(filePath);
   // uploadImageData.append('imageFile',this.selectedFile );
     storageRef.getDownloadURL().subscribe(d => {this.phase.typefile = d;
      const user=this.phase;
      console.log(this.phase)
  uploadImageData.append('user',JSON.stringify(user));
  
    this.servicePhase.UpdatePhase(this.phase.idPhase,uploadImageData).subscribe(res=>{
      localStorage.setItem("idSection","")
      
      this.getSectionByIdFormation()
      })
  }
    );
    }
}
getSectionByIdFormation(){
  let id=localStorage.getItem("idFormation1")
    this.sectionService.getSectionByIdFormation(id).subscribe(res=>{
      this.sections=res
     
      })
}

public onFileChanged(event:any) {
  //Select File
  
  this.selectedFile = event.target.files[0];
  
  
}
}



