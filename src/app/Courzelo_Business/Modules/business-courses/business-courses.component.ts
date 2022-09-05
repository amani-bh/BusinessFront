import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Course } from 'src/app/Courzelo_Trainer/Classes/CourseClass';
import { CourseService } from 'src/app/Courzelo_Trainer/Shared/Services/course.service';
import { BusinessAuthService } from '../../Shared/services/Business-auth.service';
import { BusinessTokenStorageService } from '../../Shared/services/Business-token-storage.service';
import { ShareBusinessCourseDialogComponent } from '../share-business-course-dialog/share-business-course-dialog.component';

@Component({
  selector: 'app-business-courses',
  templateUrl: './business-courses.component.html',
  styleUrls: ['./business-courses.component.css']
})
export class BusinessCoursesComponent implements OnInit {
currentUser:any;
coursesList:Course[]=[];
businessCoursesList:any[]=[];
    
    constructor( private diag: MatDialog,private businesstokenStorage: BusinessTokenStorageService,private businessAuthService: BusinessAuthService ,private courseService:CourseService) { }

  ngOnInit(): void {
    this.businessAuthService.GetUserById(this.businesstokenStorage.getUser().idBusiness).subscribe(data=>{
      this.currentUser=data;
      if(this.currentUser?.listCourses?.length!=0){
              for(var c of this.currentUser?.listCourses){
                this.courseService.getCourseById(c).subscribe(
                  data => {
                    this.coursesList.push(data);
                  },
                  err => {console.log(err);}
                );
              }
        
            }
    },
    (err) => {
      console.log(err);
    })
    this.GetCoursesByCategory()
    //this.GetCourses()
  }
  ShareCourseDialog(course:any) {
    const diagref = this.diag.open(ShareBusinessCourseDialogComponent, {
      width: '400px',
      height: 'auto',
      data:
        {
          message:course.id,
        },
      disableClose: true,
    }).afterClosed().subscribe((res => {
    }));
  }
  GetCourses(){
    if(this.currentUser?.listCourses?.length!=0){
      for(var c of this.currentUser?.listCourses){
        this.courseService.getCourseById(c).subscribe(
          data => {
            this.coursesList=data;
            // this.dataSource.data = this.coursesList as Course[];
          },
          err => {console.log(err);}
        );
      }

    }
    
    

  }

  GetCoursesByCategory(){
    this.courseService.getCourseByCategory().subscribe(data=>this.businessCoursesList=data)
  }
}
