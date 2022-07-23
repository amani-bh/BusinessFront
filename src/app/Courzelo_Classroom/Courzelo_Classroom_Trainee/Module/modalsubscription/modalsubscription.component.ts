import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Courzelo_Core/Modules/Entity/user';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { Inscription } from '../../Shared/entities/Inscription';


import { FormationService } from '../../Shared/services/formation.service';

@Component({
  selector: 'app-modalsubscription',
  templateUrl: './modalsubscription.component.html',
  styleUrls: ['./modalsubscription.component.css']
})
export class ModalsubscriptionComponent implements OnInit {
  currentuser: User | any;
ins=new Inscription()
  constructor(private tokenService:TokenStorageService,private formationService :FormationService ) { }

  ngOnInit(): void {
  }
  Inscription(){
    let id= localStorage.getItem("idFormation")
    this.currentuser = this.tokenService.getUser();
    this.formationService.Inscription(this.currentuser.id ,id,this.ins).subscribe(res=>{
console.log("test")

    })
}


}
