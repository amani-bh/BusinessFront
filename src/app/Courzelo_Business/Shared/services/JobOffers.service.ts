import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JobOffers} from "../entities/JobOffers"


@Injectable({
  providedIn: 'root'
})
export class JobOffersService {
   private baseUrl:string; 
  
  
  constructor(private http: HttpClient) {

    this.baseUrl='https://springgateway.herokuapp.com/joboffers-application/JobOffers';
  }
  public GetAlldJobs():Observable<JobOffers[]> {
    return this.http.get<[JobOffers]>(this.baseUrl)
  }


  public GetAlldJobsByState(state:String):Observable<JobOffers[]> {
    return this.http.get<[JobOffers]>(this.baseUrl+"/state/"+state)
  }
  
  public GetJobsByBusiness(id:any):Observable<JobOffers[]> {
    return this.http.get<[JobOffers]>(this.baseUrl+"/business/"+id)
  }

  public GetJobsByBusinessAndState(id:any,state:String):Observable<JobOffers[]> {
    return this.http.get<[JobOffers]>(this.baseUrl+"/business/"+id+"/"+state)
  }

  public GetCountries() {
    return this.http.get('https://restcountries.com/v2/all')
  }
  


  public GetJobById(idJob:any):Observable<JobOffers> {
    return this.http.get<JobOffers>(this.baseUrl+"/"+idJob )
  }


  public PostJob( job: JobOffers,idBusiness:String) {
    return this.http.post(this.baseUrl +"/"+idBusiness,job); 
  }

  public Put(idJob:any ,job: JobOffers):Observable<JobOffers> {
    return this.http.put<JobOffers>(this.baseUrl +"/"+idJob, job);
  }

  public Delete(idJob:any) {
    return this.http.delete(this.baseUrl +"/"+idJob);
  }
  
  
  public Activate(idJob:any):Observable<JobOffers> {
    return this.http.put<JobOffers>(this.baseUrl +"/Activate/"+idJob,null);
  }

  public Desactivate(idJob:any ):Observable<JobOffers> {
    return this.http.put<JobOffers>(this.baseUrl +"/Desactivate/"+idJob, null);
  }

  public AssignTest(idTest:any,idJob:any ):Observable<JobOffers> {
    return this.http.put<JobOffers>(this.baseUrl +"/AssignPrehiringTest/"+idJob+"/"+idTest, null);
  }

  public UnAssignTest(idJob:any ):Observable<JobOffers> {
    return this.http.put<JobOffers>(this.baseUrl +"/UnAssignPrehiringTest/"+idJob, null);
  }


  public AddTechTest(idJob:any ,idTest:any):Observable<JobOffers> {
    return this.http.put<JobOffers>(this.baseUrl +"/AddTest/"+idJob+"/"+idTest, null);
  }

  public VerifExistPrehiringTest(idTest:any):Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl +"/existPrehiring/"+idTest);
  }



}
