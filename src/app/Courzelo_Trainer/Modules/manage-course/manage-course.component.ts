import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Course } from '../../Classes/CourseClass';
import { CourseService } from '../../Shared/Services/CourseCRUD/course.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-manage-course',
  templateUrl: './manage-course.component.html',
  styleUrls: ['./manage-course.component.css']
})
export class ManageCourseComponent implements OnInit,AfterViewInit  {

  coursesList!:Course[];
  displayedColumns: string[] = ['name','progress','status','manage'];
  public dataSource= new  MatTableDataSource<Course>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private courseService:CourseService) {

  }

  ngOnInit(): void {
    this.GetCourses();

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  deleteCourse(id:string){

    Swal.fire({
      title: 'Are u sure ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      confirmButtonColor: '#07294d',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      confirmButtonText: 'Sure',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourseById(id).subscribe(result => {
          this.GetCourses()
          Swal.fire({
            title: 'Course deleted successfully',
            icon:'success',
            confirmButtonColor: '#07294d'
             })
         },
         err=>
         { console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong! ',

          })
         });

      }
    })

  }
  GetCourses(){
    this.courseService.getAllCourses().subscribe(
      data => {
        this.coursesList=data;
        this.dataSource.data = this.coursesList as Course[];},
      err => {console.log(err);}
    );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}

