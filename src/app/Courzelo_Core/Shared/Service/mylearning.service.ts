import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mylearning } from '../../Modules/Entity/mylearning';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MylearningService {

  private apiServerUrl ='http://localhost:8088';

  constructor(private http: HttpClient) { }

  public addMylearning(idUser: number): Observable<Mylearning | null> {
    return this.http.post<Mylearning>(`${this.apiServerUrl}/mylearning/add/${idUser}`, httpOptions);
  }

  public getMyLearning(idUser: number): Observable<Mylearning> {
    return this.http.get<Mylearning>(`${this.apiServerUrl}/mylearning/getmylearning/${idUser}`);
  }

  public updateMyLearning(idUser: number): Observable<Mylearning> {
    return this.http.put<Mylearning>(`${this.apiServerUrl}/mylearning/update/${idUser}`, httpOptions);
  }

  public existsMyLearning(idUser: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/mylearning/exists/${idUser}`);
  }

}
