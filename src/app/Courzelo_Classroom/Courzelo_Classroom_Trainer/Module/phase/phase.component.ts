import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { FileUpload } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/file';

import { Phase } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Phase';
import { Section } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Section';
import { PhaseService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/phase.service';
import { SectionService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/section.service';
import { ModalPhaseComponent } from '../modal-phase/modal-phase.component';






@Component({
  inputs: ['idsection'],
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit {
  @Input() idSection:any; 
  profileUrl: any;
  listidSection = [];
  url:any;
  
  constructor(private observer: BreakpointObserver,
     private sectionService:SectionService,
     private diag: MatDialog,
     private phaseService:PhaseService,
     private storage: AngularFireStorage,
     private db: AngularFireDatabase) {
      
      }
 
  section=new Section()
  step = 0;
  test=true
  sections!:Section[]
   phases!:Phase[]
   phase!:Phase[]
   v!:any
   

   retrievedImage: any;

base64Data:any; 

  setStep(index: number) {
    this.step = index;
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.phases, event.previousIndex, event.currentIndex);
  }


  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  test2 =false;
  ngOnInit(): void {
    
     

    this.v="primary"
    this.getphaseById()
      
      /*this.listidSection.push(this.idSection)
    console.log(this.listidSection)
      this.phases.forEach(p=>
      {
        console.log(p)
        const ref = this.storage.refFromURL(this.path+"'/'"+this.idSection.toString()+"'/'"+p.title+"'");
        console.log(this.path+"'/'"+p.idsection+"'/'"+p.title+"'")
      if(ref != null){
        let myurlsubscription = ref.listAll().subscribe(data => {
          for (let i = 0; i < data.items.length; i++) {
          let name: any = data.items[i].name;
          let newref = this.storage.refFromURL(ref+data.items[i].name);
          newref.getDownloadURL().subscribe((data) => {
            this.filelist.push({
              name: name,
              videolink: data
            });
          });
        }
        console.log(this.filelist)
      }
      )
      }
    }
  )*/

     
     
      this.retrievedImage = 'data:image/jpeg;base64,';
      console.log(this.retrievedImage)
              
  }
  getphaseById(){
    let id=localStorage.getItem("idFormation1")
    this.phaseService.getPhaseByIdSection(this.idSection).subscribe(resA=>{
      this.phases=resA;
      })
  }

  deletePhase(id:any){
    this.phaseService.deletePhaseById(id).subscribe(res=>{
      this.getphaseById()
    })
  }

  AddphaseDialog(id:any) {
    localStorage.setItem("idPhase",id)
    localStorage.setItem("e",'1')
    const diagref = this.diag.open(ModalPhaseComponent, {
      width: '700px',
      height: '500px',


      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.ngOnInit
    }));;


  }
  imageisnull(j:any):boolean{
      if (j != null && (j.includes(".png") || j.includes(".jpg"))){
        return true;
      }
      else {return false;}
  }
  videoisnull(j:any):boolean{
    if (j != null && j.includes(".mp4")){
      return true;
    }
    else {return false;}
}
pdfisnull(j:any):boolean{
  
  if (j != null && j.includes(".pdf")){ 
  
    return true;
  }
  else {return false;}
}

}