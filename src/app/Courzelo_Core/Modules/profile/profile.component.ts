import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/Courzelo_Core/Shared/Service/token-storage.service';
import { CourseService } from 'src/app/Courzelo_Trainer/Shared/Services/course.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  coursesList:any;

  constructor(private token: TokenStorageService, private courseService:CourseService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.courseService.getAllCourses().subscribe(
      data => {this.coursesList=data;},
      err => {console.log(err);}
    );
  }

}
