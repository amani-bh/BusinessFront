import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JobOffers} from "../entities/JobOffers"
import { TechTest } from '../entities/TechTest';


@Injectable({
  providedIn: 'root'
})
export class TechTestService {
   private baseUrl:string; 
  
  constructor(private http: HttpClient) {

    // this.baseUrl='https://springgateway.herokuapp.com/prehiring-tests-application/Tests';
    this.baseUrl='http://localhost:8087/Tests';
  }
  public GetAlldtechTest():Observable<TechTest[]> {
    return this.http.get<[TechTest]>(this.baseUrl)
  }
  public GetAlldtechTestByBusiness(id:any):Observable<TechTest[]> {
    return this.http.get<[TechTest]>(this.baseUrl+"/"+id)
  }
  public GetAlldtechTestByCompanyName(companyName:any):Observable<TechTest[]> {
    return this.http.get<[TechTest]>(this.baseUrl+"/byCompanyName/"+companyName)
  }
  
  public PostJobTechTest( t: TechTest,idBusiness:any) :Observable<TechTest>{
    return this.http.post<TechTest>(this.baseUrl+"/"+idBusiness ,t); 
  }

 
  
}
