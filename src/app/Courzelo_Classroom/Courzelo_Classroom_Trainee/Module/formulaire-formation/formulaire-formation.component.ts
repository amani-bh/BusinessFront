import { Component, OnInit } from '@angular/core';



import { FormationService } from '../../Shared/services/formation.service';
import { Inscription } from '../../Shared/entities/Inscription';
@Component({
  selector: 'app-formulaire-formation',
  templateUrl: './formulaire-formation.component.html',
  styleUrls: ['./formulaire-formation.component.css']
})
export class FormulaireFormationComponent implements OnInit {
  closeResult = '';
  inscriptionobject = new Inscription();

  constructor(private formationService:FormationService) {}
  ngOnInit(): void {}
 
  inscription(inscription:any){
  
    let idFormation=localStorage.getItem("idFormation")
    this.formationService.Inscription(3,idFormation,inscription).subscribe(
      data => { },
      error => { console.log("error"); });
  }

  }
  
