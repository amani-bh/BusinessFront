import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/Courzelo_Trainer/Classes/CourseClass';
// const API_URL = 'https://courzelo-bilel-backend.herokuapp.com/course/';
const API_URL =
  'https://springgateway.herokuapp.com/course-service-trainer/course/';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}
  getAllCourses(): Observable<any> {
    return this.http.get(API_URL + 'getAllCourses', { responseType: 'json' });
  }
  getCourseById(idCourse: any): Observable<any> {
    return this.http.get(API_URL + `getById/${idCourse}`, {
      responseType: 'json',
    });
  }
  addCourse(course: Course): Observable<any> {
    return this.http.post(API_URL + 'addCourse', course);
  }
  deleteCourseById(idCourse: string): Observable<any> {
    return this.http.delete(API_URL + `delete/${idCourse}`);
  }
}
