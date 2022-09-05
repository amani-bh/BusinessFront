import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OtherTest } from '../entities/OtherTest';
import { QuestionsOtherTest } from '../entities/OtherTest';

@Injectable({
  providedIn: 'root'
})
export class OtherTestService {
  private baseUrl:string; 
  
  constructor(private http: HttpClient) {

    // this.baseUrl='https://springgateway.herokuapp.com/prehiring-tests-application/OtherTests';
    this.baseUrl='http://localhost:8087/OtherTests';
  }
  public GetAlldTests():Observable<OtherTest[]> {
    return this.http.get<[OtherTest]>(this.baseUrl)
  }

  public GetTestsByBusiness(idBusiness:any):Observable<OtherTest[]> {
    return this.http.get<[OtherTest]>(this.baseUrl+"/business/"+idBusiness)
  }

  public GetTestsByCompanyName(companyName:any):Observable<OtherTest[]> {
    return this.http.get<[OtherTest]>(this.baseUrl+"/businessCompanyName/"+companyName)
  }

  public GetTestById(idTest:any):Observable<OtherTest> {
    return this.http.get<OtherTest>(this.baseUrl+"/"+idTest )
  }

  public TestScore( id:any,test: OtherTest) :Observable<number>{
    return this.http.post<number>(this.baseUrl +"/score/"+id,test); 
  }
  
  public PostTest( test: OtherTest,idBusiness:any) :Observable<OtherTest>{
    return this.http.post<OtherTest>(this.baseUrl +"/"+idBusiness,test); 
  }

  public PutTest(idOtherTest:any ,test: OtherTest):Observable<OtherTest> {
    return this.http.put<OtherTest>(this.baseUrl +"/"+idOtherTest, test);
  }

  public DeleteTest(idOtherTest:any) {
    return this.http.delete(this.baseUrl +"/"+idOtherTest);
  } 


  public AddQuestion( idTest: any,q:QuestionsOtherTest) :Observable<OtherTest>{
    return this.http.post<OtherTest>(this.baseUrl+"/Questions/"+idTest ,q); 
  }

  public GetQuestions( idTest: any):Observable<QuestionsOtherTest[]> {
    return this.http.get<[QuestionsOtherTest]>(this.baseUrl +"/Questions/" + idTest); 
  }

  public DeleteQuestions( idTest: any ,questionId:any) {
    return this.http.delete(this.baseUrl +"/Questions/" + idTest +"/"+questionId ); 
  }

}
