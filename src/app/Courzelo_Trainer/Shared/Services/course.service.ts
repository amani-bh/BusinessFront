import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const API_URL = 'https://springgateway.herokuapp.com/course-service-trainer/course/';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) { }
  getAllCourses(): Observable<any> {
    return this.http.get(API_URL + 'getAllCourses', { responseType: 'json' });
  }
  getCourseById( idCourse:any): Observable<any> {
    return this.http.get(API_URL + `getById/${idCourse}`, { responseType: 'json' });
  }
}
