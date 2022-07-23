import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../entities/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projecturl : string = "https://springgateway.herokuapp.com/quizcourzelo/api/Project/";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http : HttpClient) { }
  addproject(project : Project) : Observable<Project>{ return this.http.post<Project>(this.projecturl+"add_project",project,this.httpOptions)}
 getprojectbyid(id:string):Observable<Project>{ return this.http.get<Project>(this.projecturl+"get_projectbyid/"+id)}
updateproject(id: string, project: Project): Observable<Project> {
  return this.http.put<Project>(this.projecturl+"update_project/"+ id, project, this.httpOptions);
  }
}
