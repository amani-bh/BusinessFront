import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Course } from 'src/app/Courzelo_Trainer/Classes/CourseClass';
import { CourseService } from 'src/app/Courzelo_Trainer/Shared/Services/CourseCRUD/course.service';
import Swal from 'sweetalert2';
import { CartService } from '../../Shared/Service/cart.service';
import { TokenStorageService } from '../../Shared/Service/token-storage.service';
import { Cart } from '../Entity/cart';
import { User } from '../Entity/user';
@Component({
  selector: 'app-single-course-detail',
  templateUrl: './single-course-detail.component.html',
  styleUrls: ['./single-course-detail.component.css'],
})
export class SingleCourseDetailComponent implements OnInit {
  currentuser: User | any;
  courseID!: string;
  coursesList: any;
  course: Course = new Course(
    0,
    '',
    '',
    '',
    [],
    '',
    '',
    [],
    {},
    [],
    [],
    {},
    '',
    [],
    '',
    '',
    '',
    0,
    0,
    '','',0
  );

  introductionPhases: any;
  introductionName!: any;
  introductionPhasesLength: any;
  sectionsWithModel: any;
  sectionsWithModelLength: any;
  sectionsWithoutModel: any;
  sectionsWithoutModelLength: any;
  conclusionName!: any;
  conclusionPhases!: any;
  constructor(
    private courseService: CourseService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private cartService:CartService,
    private tokenService:TokenStorageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.courseID = params.get('id') || '';
    });
    this.courseService.getCourseById(this.courseID).subscribe(
      (data) => {
        this.course = data;
        this.sectionsWithModel = data.sections;
        this.sectionsWithoutModel = data.customerSections;
        this.introductionName = Object.values(data.introduction)[0];
        this.introductionPhases = Object.values(data.introduction)[1];

        this.conclusionName = Object.values(data.conclusion)[0];
        this.conclusionPhases = Object.values(data.conclusion)[1];
        this.introductionPhasesLength = this.introductionPhases.length;
        this.sectionsWithModelLength = this.sectionsWithModel.length;
        this.sectionsWithoutModelLength = this.sectionsWithoutModel.length;
        console.log(this.sectionsWithoutModelLength);
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
    
  }

  public onAddCart(): void {
    this.currentuser = this.tokenService.getUser();
    this.cartService.addCart(this.currentuser.id, this.courseID).subscribe(
      (response: Cart | null) => {
        Swal.fire({
          title: 'Success!',
          text: 'The course was added to your cart',
          icon: 'success',
          confirmButtonText: 'Return'
        })
         console.log(this.currentuser.id);
        console.log(response!.user.id);
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        Swal.fire({
          title: 'Error!',
          text: 'You have already add this course, consult your cart',
          icon: 'error',
          confirmButtonText: 'Return'
        })
      }
    );
  }

  
}
