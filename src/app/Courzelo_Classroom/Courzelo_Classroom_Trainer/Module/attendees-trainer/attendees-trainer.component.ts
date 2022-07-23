import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/User';
import { FormationService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/formation.service';




export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-attendees-trainer',
  templateUrl: './attendees-trainer.component.html',
  styleUrls: ['./attendees-trainer.component.css']
})
export class AttendeesTrainerComponent implements OnInit {
  
  
 
  
  id=localStorage.getItem("idFormation1")
users!:User[]
  constructor(private formationService :FormationService,private router:ActivatedRoute) { }
  
  idpath:any;
teacher:User = new User();
  ngOnInit(): void {
    
    this.formationService.getListUserParticipant(this.id).subscribe(res=>{
      
      this.users = res
      
      })
      this.formationService.getFormationsById(this.id).subscribe((res:any)=>{
        
        this.formationService.getUserById(res.idUserr).subscribe(
         res => this.teacher = res
        )
      })
  }

}
