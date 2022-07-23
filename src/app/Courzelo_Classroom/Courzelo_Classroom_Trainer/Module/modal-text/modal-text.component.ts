import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Section';
import { SectionService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/section.service';

@Component({
  selector: 'app-modal-text',
  templateUrl: './modal-text.component.html',
  styleUrls: ['./modal-text.component.css']
})
export class ModalTextComponent implements OnInit {
section=new Section()
A!:any

  constructor(public router: Router, private route: ActivatedRoute, private diag: MatDialog,private sectionService:SectionService) { }

  ngOnInit(): void {
    let e=localStorage.getItem("e")
    if(e==='0'){
this.A="Add section"
    }
    if(e==='1'){
      this.A="Update section name" 
      let id=localStorage.getItem("idSection")
      this.sectionService.getSectionById(id).subscribe(res=>{
        this.section=res
      })
    }
  }
  addSection(){
   

  let e=localStorage.getItem("e")
  if(e==='0'){
let id=localStorage.getItem("idFormation1")
this.sectionService.addSection(id,this.section).subscribe(res=>{

})
}
if(e==='1'){
  this.sectionService.UpdateSection(this.section.idSection,this.section).subscribe(res=>{
   
    })
    }
}
}
