import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/entities/Formation';
import { FormationService } from 'src/app/Courzelo_Classroom/Courzelo_Classroom_Trainee/Shared/services/formation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-update-courses',
  templateUrl: './modal-update-courses.component.html',
  styleUrls: ['./modal-update-courses.component.css']
})
export class ModalUpdateCoursesComponent implements OnInit {

  Form!: FormGroup;
  formation!:Formation
  constructor(public router: Router, private route: ActivatedRoute, private diag: MatDialog,  public dialogRef: MatDialogRef<ModalUpdateCoursesComponent>,private formationService:FormationService,private fb: FormBuilder) 
  { }

  ngOnInit(): void {
let id =localStorage.getItem("idFormation1")
    this.formationService.getFormationsById(id).subscribe(
      data => { this.formation = data;

        this.Form.get("coursename")?.setValue(this.formation.coursename);
        this.Form.get("date")?.setValue(this.formation.date);
        this.Form.get("category")?.setValue(this.formation.category);
        this.Form.get("coursesummary")?.setValue(this.formation.coursesummary);
        this.Form.get("difficultylevel")?.setValue(this.formation.difficultylevel);
        this.Form.get("instructorname")?.setValue(this.formation.instructorname);
        this.Form.get("descriptioncourse")?.setValue(this.formation.descriptioncourse);
        this.Form.get("descriptiontrainer")?.setValue(this.formation.descriptiontrainer);
        this.Form.get("price")?.setValue(this.formation.price);
        }
         
       )
       

       

       this.Form = this.fb.group({
        coursename: ['', Validators.required],
        date: ['', Validators.required],
        category: ['', Validators.required],
        difficultylevel: ['', Validators.required],
        coursesummary: ['', Validators.required],
        instructorname: ['', Validators.required],
        descriptioncourse: ['', Validators.required],
        descriptiontrainer: ['', Validators.required],
        price: ['', Validators.required],
      })


  }

  
 
 

  
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      //console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  updateFormation() {
   

    if(this.Form.invalid){
      this.validateAllFormFields(this.Form);
    }
    else if(this.Form.valid){
     if (this.formation) 
     {
        //var id=this.data.message.idJob;
        //console.log(id);
       // this.setData();
   this.formation.coursename=this.Form.value.coursename
   this.formation.date=this.Form.value.date
   this.formation.category=this.Form.value.category
   this.formation.difficultylevel=this.Form.value.difficultylevel
   this.formation.coursesummary=this.Form.value.coursesummary
   Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
   
    showCancelButton: true,
    confirmButtonText: 'Save',
    confirmButtonColor:'#07294d',
    denyButtonText: `Don't save`,
    denyButtonColor:'#ffc600',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this.formationService.UpdateFormations(this.formation.idFormation,this.formation).subscribe((res) => {
        this.closeDialog()
     
      }, (error) => {
        console.log(error);
       
    
   } )
      Swal.fire('Saved!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
       
       
    }
  }
  }
  
  
  

 


 


  closeDialog() {
    this.dialogRef.close(false);
   
  }

  
  

public hasError = (controlName: string, errorName: string) =>{
  this.Form.controls[controlName].markAllAsTouched();
  return this.Form.controls[controlName].hasError(errorName);
}


coursenameFormControl = new FormControl('', [Validators.required, ]);
coursesummaryFormControl = new FormControl('', [Validators.required, ]);
  instructornameFormControl = new FormControl('', [Validators.required, ]);


  Difficultylevel = new FormControl('', Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  Difficulty = [
  ];


  Categorylevel = new FormControl('', Validators.required);
  selectFormControl1 = new FormControl('', Validators.required);
  Category = [  
  ];


}
