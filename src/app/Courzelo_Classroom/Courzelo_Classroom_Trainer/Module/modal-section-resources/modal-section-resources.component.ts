import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { FileUpload } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/file';
import { Phase } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Phase';
import { Section } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Section';
import { FileUploadService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/file-upload.service';
import { PhaseService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/phase.service';
import { SectionService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/section.service';
import { ModalPhaseComponent } from '../modal-phase/modal-phase.component';

const TOKEN_KEY = 'auth-user';
@Component({
  selector: 'app-modal-section-resources',
  templateUrl: './modal-section-resources.component.html',
  styleUrls: ['./modal-section-resources.component.css']
})
export class ModalSectionResourcesComponent implements OnInit {
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

 
  fileUploads?: any[];
title:any;
  sections!:Section[]
  phase= new Phase()
  idSection!:any
  selectedFile!:File
file = new File(["images"], "images.png", {
  type: "image/png",
});
  constructor(private uploadService: FileUploadService,
    public router: Router, 
    private route: ActivatedRoute, 
    private diag: MatDialog, 
    public sectionService:SectionService, 
    public dialogRef: MatDialogRef<ModalPhaseComponent>,
    private servicePhase:PhaseService,
    private storage: AngularFireStorage) { }
  name:any = JSON.parse(window.sessionStorage.getItem(TOKEN_KEY)!).displayName

  ngOnInit(): void {
    
    
     this.getSectionByIdFormation()
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

getSectionByIdFormation(){
  let id=localStorage.getItem("idFormation1")
    this.sectionService.getSectionByIdFormation(id).subscribe(res=>{
      this.sections=res
     
      })
}



    addPhase(){
      let e=localStorage.getItem("e")
      
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
    if(id == ""){
      this.servicePhase.addPhase(this.idSection,uploadImageData).subscribe(res=>{
        
        this.getSectionByIdFormation()
        })
    }
    else{
      this.servicePhase.addPhase(id,uploadImageData).subscribe(res=>{
        localStorage.setItem("idSection","")
        
        this.getSectionByIdFormation()
        })
    }
      });
      
    }
    
    
    }

  public onFileChanged(event:any) {
    //Select File
    
    this.selectedFile = event.target.files[0];
    
    
  }

}
