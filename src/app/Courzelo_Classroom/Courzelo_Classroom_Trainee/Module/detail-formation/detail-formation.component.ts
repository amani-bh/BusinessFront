import { Component, Inject, OnInit } from '@angular/core';
import { Formation } from '../../Shared/entities/Formation';
import { FormationService } from '../../Shared/services/formation.service';
import { User } from '../../Shared/entities/User';
import { MatDialog } from '@angular/material/dialog';
import { ModalsubscriptionComponent } from '../modalsubscription/modalsubscription.component';

@Component({
  selector: 'app-detail-formation',
  templateUrl: './detail-formation.component.html',
  styleUrls: ['./detail-formation.component.css']
})
export class DetailFormationComponent implements OnInit {

  constructor(private diag: MatDialog,private formationDetailService:FormationService,) { }
 
  animal!: string;
  name!: string;
  formationDetail!:Formation
  title!:any
  duaration!:any
  price!:any
  quizzes!:any
  category!:any
  leactures!:any
  students!:number
  description!:String
  user!:User
  nameUser!:any
  desUser!:any
  instructorname!:any
  ngOnInit(): void {
    
     let id= localStorage.getItem("idFormation")
      this.formationDetailService.getFormationsById(id).subscribe(
        data => { this.formationDetail = data;
          this.title=this.formationDetail.coursename;
         this.duaration= this.formationDetail.date
         this.price=this.formationDetail.price
         this.category=this.formationDetail.category
         this.instructorname=this.formationDetail.instructorname
        
         this.description=this.formationDetail.descriptioncourse
       
        console.log(this.formationDetail)
        },
  
        error => { console.log("error"); });
  
    
  
    
  }
  AddtextDialog() {
    localStorage.setItem("e",'0')
       const diagref = this.diag.open(ModalsubscriptionComponent, {
         width: '700px',
         height: '350px',
   
   
         disableClose: true,
       }) .afterClosed().subscribe((res => {
         this.ngOnInit
       }));;
      
   
     }

}

