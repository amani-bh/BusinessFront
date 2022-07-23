import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalPhaseComponent } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainer/Module/modal-phase/modal-phase.component';
import { ModalSectionResourcesComponent } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainer/Module/modal-section-resources/modal-section-resources.component';
import { ModalTextComponent } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainer/Module/modal-text/modal-text.component';
import { Formation } from '../../Shared/entities/Formation';
import { Phase } from '../../Shared/entities/Phase';
import { Section } from '../../Shared/entities/Section';
import { PhaseService } from '../../Shared/services/phase.service';
import { SectionService } from '../../Shared/services/section.service';

@Component({
  selector: 'app-class-work-trainee',
  templateUrl: './class-work-trainee.component.html',
  styleUrls: ['./class-work-trainee.component.css']
})
export class ClassWorkTraineeComponent implements OnInit {



  constructor(private observer: BreakpointObserver,
     private sectionService:SectionService,
     private diag: MatDialog,
     private phaseService:PhaseService) { }
  formation!:Formation[]
  formationDetail!:Formation
  section=new Section()
  step = 0;
  test=false
  sections!:Section[]
   phases!:Phase[]
   phase!:Phase[]
   v!:any
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
    let id=localStorage.getItem("idFormation1")
    this.sectionService.getSectionByIdFormation(id).subscribe(res=>{
      this.sections=res
      this.sections.forEach(element => {
        this.phaseService.getPhaseByIdSection(element.idSection).subscribe(resA=>{
this.phases=resA

console.log(this.phases)
        })
        
      });
     
    
    })
  }



 

  
 }
