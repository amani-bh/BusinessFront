import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalPhaseComponent } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainer/Module/modal-phase/modal-phase.component';
import { Phase } from '../../Shared/entities/Phase';
import { Section } from '../../Shared/entities/Section';
import { PhaseService } from '../../Shared/services/phase.service';
import { SectionService } from '../../Shared/services/section.service';

@Component({
  selector: 'app-phase-trainee',
  templateUrl: './phase-trainee.component.html',
  styleUrls: ['./phase-trainee.component.css']
})
export class PhaseTraineeComponent implements OnInit {
  @Input() idSection:any; 
  constructor(private observer: BreakpointObserver, private sectionService:SectionService,private diag: MatDialog,private phaseService:PhaseService) { }
 
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
  ngOnInit(): void {

    this.v="primary"
    let id=localStorage.getItem("idFormation1")
    this.phaseService.getPhaseByIdSection(this.idSection).subscribe(resA=>{
      this.phases=resA
    
      console.log(this.phases)

      this.retrievedImage = 'data:image/jpeg;base64,';
      console.log(this.retrievedImage)
              })
  }

  deletePhase(id:any){
    this.phaseService.deletePhaseById(id).subscribe(res=>{
      window.location.reload()
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

}
