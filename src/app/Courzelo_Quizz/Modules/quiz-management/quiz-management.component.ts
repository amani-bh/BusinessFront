import { Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Quiz } from '../../Shared/entities/Quiz';
import { QuizService } from '../../Shared/services/quiz.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-quiz-management',
  templateUrl: './quiz-management.component.html',
  styleUrls: ['./quiz-management.component.css']
})
export class QuizManagementComponent implements OnInit {
  quizs!:Quiz[];
  displayedColumns = ['title','creationdate','evaluationmodel','action'];
  public dataSource= new  MatTableDataSource<Quiz>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer,private quizservice : QuizService,private _router: Router) { }

  ngOnInit(): void {
this.Getquizs();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  

 
  SortChange(sortState: Sort) {
  
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  public doFilter = (value: string) => {
   
    this.dataSource.filter = value.trim().toLocaleLowerCase();

  }

  Getquizs(){
    this.quizservice.gatallquiz().subscribe(data=>{this.quizs=data;
     this.dataSource.data = this.quizs as Quiz[];
       })}

       DeleteQuiz( id:string)
       {Swal.fire({
        title: 'Are u sure ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        confirmButtonColor: '#07294d',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        confirmButtonText: 'Sure',
      }).then((result) => {
        if (result.isConfirmed) {
          this.quizservice.DeleteQuiz(id).subscribe(res=>{this.Getquizs; 
            Swal.fire({
              title: 'Job offers deleted successfully',
              icon:'success',
              confirmButtonColor: '#07294d'
               })
           },
           err=>
           { console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! ' + err,
         
            })
          });
         
       }
     })

     


       }

      
         
         }
         
 


