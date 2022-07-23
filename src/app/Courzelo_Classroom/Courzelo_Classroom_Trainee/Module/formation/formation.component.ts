import { Component, OnInit } from '@angular/core';
import { Formation } from '../../Shared/entities/Formation';
import { FormationService } from '../../Shared/services/formation.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {

  constructor(private formationService:FormationService) { }
  formation!:Formation[]
  formationDetail!:Formation
  ngOnInit(): void {
    this.formationService.getAllFormations().subscribe(
      data => { this.formation = data;
      
      },
      error => { console.log("error"); });
  }
  getFormationById(id:any){
    localStorage.setItem("idFormation",id)
  }

}
