import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MylearningService } from '../../Shared/Service/mylearning.service';
import { TokenStorageService } from '../../Shared/Service/token-storage.service';
import { Course } from '../Entity/course';
import { Mylearning } from '../Entity/mylearning';
import { User } from '../Entity/user';

@Component({
  selector: 'app-mylearning',
  templateUrl: './mylearning.component.html',
  styleUrls: ['./mylearning.component.css']
})
export class MylearningComponent implements OnInit {

  constructor(private mylearningService: MylearningService, private tokenService: TokenStorageService) { }

  courses: Course[] | any;
  currentuser: User | any;
  ngOnInit(): void {
    this.currentuser= this.tokenService.getUser();
    this.getMylearning(this.currentuser.id);
    this.courses;
  }

  public getMylearning(userId: number): void {
    
    this.mylearningService.getMyLearning(userId).subscribe(
      (response: Mylearning) => {
        
        this.courses=[...response.courses];
        console.log(response.courses);
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: 'Your my learning space is empty',
          icon: 'error',
          confirmButtonText: 'Return'
        })
      }
    );
  }

}
