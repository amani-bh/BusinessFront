import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../Shared/entities/User';
import { FormationService } from '../../Shared/services/formation.service';

@Component({
  selector: 'app-attendees-trainee',
  templateUrl: './attendees-trainee.component.html',
  styleUrls: ['./attendees-trainee.component.css']
})
export class AttendeesTraineeComponent implements OnInit {
 
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