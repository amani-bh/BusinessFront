import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs';
import { Formation } from '../../Shared/entities/Formation';
import { FormationService } from '../../Shared/services/formation.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormGroup } from '@angular/forms';
import { PaginationService } from 'ngx-pagination';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { User } from '../../Shared/entities/User';



@Component({
  selector: 'app-espace-formation',
  templateUrl: './espace-formation.component.html',
  styleUrls: ['./espace-formation.component.css']

})

export class EspaceFormationComponent implements OnInit {
    formation!:Formation[]

    formGroup!: FormGroup;
    p: number = 1;
  search_name:any;
  listFormation :any;
  currentuser: User | any;
  constructor(private tokenService:TokenStorageService,
    private observer: BreakpointObserver,
    private formationService:FormationService,
    private paginationService: PaginationService) {  }

  ngOnInit(): void {
    this.currentuser = this.tokenService.getUser();
    this.formationService.getFormationsByIdStudent(this.currentuser.id).subscribe(
      data => { this.formation = data;
      console.log(this.formation)
      },
      error => { console.log("error"); });
  }
  getIdFormation(id:any){
    localStorage.setItem("idFormation1",id)
    }
  
  

}
