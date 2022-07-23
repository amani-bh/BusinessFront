import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs';
import { Formation } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Formation';
import { FormationService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/formation.service';
import { User } from 'src/app/Courzelo_Core/Modules/Entity/user';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { ModalCoursesTrainerComponent } from '../modal-courses-trainer/modal-courses-trainer.component';

@Component({
  selector: 'app-archived-courses-trainer',
  templateUrl: './archived-courses-trainer.component.html',
  styleUrls: ['./archived-courses-trainer.component.css']
})
export class ArchivedCoursesTrainerComponent implements OnInit {

  formation!:Formation[]
  currentuser: User | any;

  formGroup!: FormGroup;
  p: number = 1;
  search_name:any;
  listFormation :any;
  
  constructor(private tokenService:TokenStorageService,formBuilder: FormBuilder,private observer: BreakpointObserver,private formationService:FormationService,private diag: MatDialog) {
    this.formGroup = formBuilder.group({
      enableWifi: '',
      acceptTerms: ['', Validators.requiredTrue],
    });
  }


  ngOnInit(): void {

    this.currentuser = this.tokenService.getUser();
    localStorage.setItem("e","0");
    localStorage.removeItem("idFormation1")

    this.formationService.getFormationsByTest(false,this.currentuser.id).subscribe(
      data => { this.formation = data;

      },

      error => { console.log("error"); });
    }
      

      
      AddcoursesDialog() {
        localStorage.setItem("e","0")
        const diagref = this.diag.open(ModalCoursesTrainerComponent, {
          width: '900px',
          height: '700px',


          disableClose: true,
        }) .afterClosed().subscribe((res => {
          this.ngOnInit
        }));;


      }

      getIdFormation(id:any){
        localStorage.setItem("idFormation1",id)
        }
        }

