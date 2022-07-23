import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question, PrehiringTests } from '../entities/PrehiringTests';


@Injectable({
  providedIn: 'root'
})
export class TestsService {
   private baseUrl:string; 
  
  constructor(private http: HttpClient) {

    this.baseUrl='https://springgateway.herokuapp.com/prehiring-tests-application/PrehiringTests';
  }
  public GetAlldTests():Observable<PrehiringTests[]> {
    return this.http.get<[PrehiringTests]>(this.baseUrl)
  }

  public GetTestsByBusiness(idBusiness:any):Observable<PrehiringTests[]> {
    return this.http.get<[PrehiringTests]>(this.baseUrl+"/business/"+idBusiness)
  }

  public GetTestById(idTest:any):Observable<PrehiringTests> {
    return this.http.get<PrehiringTests>(this.baseUrl+"/"+idTest )
  }

  public TestScore( id:any,test: PrehiringTests) :Observable<number>{
    return this.http.post<number>(this.baseUrl +"/score/"+id,test); 
  }
  
  public PostTest( test: PrehiringTests,idBusiness:any) :Observable<PrehiringTests>{
    return this.http.post<PrehiringTests>(this.baseUrl +"/"+idBusiness,test); 
  }

  public PutTest(idPrehiringTest:any ,test: PrehiringTests):Observable<PrehiringTests> {
    return this.http.put<PrehiringTests>(this.baseUrl +"/"+idPrehiringTest, test);
  }

  public DeleteTest(idPrehiringTest:any) {
    return this.http.delete(this.baseUrl +"/"+idPrehiringTest);
  } 


  public AddQuestion( idTest: any,q:Question) :Observable<PrehiringTests>{
    return this.http.post<PrehiringTests>(this.baseUrl+"/Questions/"+idTest ,q); 
  }

  public GetQuestions( idTest: any):Observable<Question[]> {
    return this.http.get<[Question]>(this.baseUrl +"/Questions/" + idTest); 
  }

  public DeleteQuestions( idTest: any ,questionId:any) {
    return this.http.delete(this.baseUrl +"/Questions/" + idTest +"/"+questionId ); 
  }

}
