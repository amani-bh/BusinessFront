
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Formation } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Formation';
import { Phase } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Phase';
import { Section } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Section';
import { PhaseService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/phase.service';
import { SectionService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/section.service';
import { ModalPhaseComponent } from '../modal-phase/modal-phase.component';
import { ModalSectionResourcesComponent } from '../modal-section-resources/modal-section-resources.component';

import { ModalTextComponent } from '../modal-text/modal-text.component';

@Component({
  selector: 'app-class-work-trainer',
  templateUrl: './class-work-trainer.component.html',
  styleUrls: ['./class-work-trainer.component.css']
})
export class ClassWorkTrainerComponent implements OnInit {



  constructor(private observer: BreakpointObserver, private sectionService:SectionService,private diag: MatDialog,private phaseService:PhaseService) { }
  formation!:Formation[]
  formationDetail!:Formation
  section=new Section()
  step = 0;
  test=false
  sections!:Section[]
   phases!:Phase[]
   phase!:Phase[]
   v!:any
   id=localStorage.getItem("idFormation1")
  setStep(index: number) {
    this.step = index;
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }


  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  ngOnInit(): void {
localStorage.setItem("idSection","")
    this.v="primary"
    
    this.getdata()
   
  }
getdata(){
  this.sectionService.getSectionByIdFormation(this.id).subscribe(res=>{
    this.sections=res
    this.sections.forEach(element => {
      this.phaseService.getPhaseByIdSection(element.idSection).subscribe(resA=>{
this.phases=resA


      })
      
    });
   
  
  })
}


  addSection(){
    let id=localStorage.getItem("idFormation1")
    this.sectionService.addSection(id,this.section).subscribe(res=>{
    
    })
  }

  AddphaseDialog(id:any) {
    localStorage.setItem("idSection",id)
    localStorage.setItem("e",'0')
    const diagref = this.diag.open(ModalPhaseComponent, {
      width: '700px',
      height: '500px',


      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.getdata()
    }));;


  }

  AddtextDialog() {
 localStorage.setItem("e",'0')
    const diagref = this.diag.open(ModalTextComponent, {
      width: '700px',
      height: '350px',


      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.getdata()
    }));;
   

  }


  
  UpdatetextDialog() {
 localStorage.setItem("e",'1')
    const diagref = this.diag.open(ModalTextComponent, {
      width: '700px',
      height: '350px',


      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.ngOnInit
    }));;
   

  }



  AddsectionresourcesDialog() {
 
    const diagref = this.diag.open(ModalSectionResourcesComponent, {
      width: '700px',
      height: '600px',


      disableClose: true,
    }) .afterClosed().subscribe((res => {
      this.ngOnInit
    }));;
   

  }




  changeEditing(){
    this.test=!this.test
  }
  updateName(id:any){
this.sectionService.UpdateSection(id,this.section).subscribe(res=>{
  

})
    
  }

  deleteSection(id:any){
    this.sectionService.deleteSectionById(id).subscribe(res=>{
      
    })
  }

  
  
}
