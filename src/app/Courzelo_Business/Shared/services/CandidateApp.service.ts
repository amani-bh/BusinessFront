import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {AppState, CandidateApp} from '../entities/CandidateApp'
import { catchError, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CandidateAppService {
   private baseUrl:string; 
  
  constructor(private http: HttpClient) {

    //this.baseUrl='https://springgateway.herokuapp.com/candidateapp-application/CandidateApp';
    this.baseUrl='http://localhost:8086/CandidateApp';
  }
 

  public GetAlldApps():Observable<CandidateApp[]> {
    return this.http.get<[CandidateApp]>(this.baseUrl)
  }



  public GetApplicationById(id:any ) {
    return this.http.get<CandidateApp>(this.baseUrl+"/"+id); 
  }


  public GetApplicationByJob(idJob:any ):Observable<CandidateApp[]> {
    return this.http.get<[CandidateApp]>(this.baseUrl+"/byJob/"+idJob); 
  }
 
  public GetApplicationByUser(userId:any ) {
    return this.http.get<[CandidateApp]>(this.baseUrl+"/byUser/"+userId); 
  }

  public ExistApp(idJob:any,Id:any ) :Observable<boolean>{
    return this.http.get<boolean>(this.baseUrl+"/Exist/"+idJob+"/"+Id); 
  }


  public GetApplicationByBusiness(idBusiness:any ) {
    return this.http.get<[CandidateApp]>(this.baseUrl+"/business/"+idBusiness); 
  }
  public GetApplicationByBusinessCompanyName(companyName:any ) {
    return this.http.get<[CandidateApp]>(this.baseUrl+"/businessCompanyName/"+companyName); 
  }



  public GetCurrentState(idApp:any) {
    return this.http.get<AppState>(this.baseUrl+"/currentState/"+idApp); 
  }

  public PostApp(app: any,idJob:any,id:any ) :Observable<CandidateApp>{
    return this.http.post<CandidateApp>(this.baseUrl+"/"+idJob+"/"+id,app); 

    
  }

  public SendMail(mail: any,content:string ){
    return this.http.post(this.baseUrl+"/mail/"+mail,content); 

    
  }
  

  public AddState(state: any,idApp:any ) :Observable<CandidateApp>{
    return this.http.post<CandidateApp>(this.baseUrl+"/State/"+idApp,state); 
  }
  
  public upload(idApp:any ,file:File) {
    return this.http.post(this.baseUrl+"/upload/"+idApp,file); 
  } 

  public retrive(idApp:any ,file:File) {
    return this.http.post(this.baseUrl+"/upload/"+idApp,file); 
  }


  public AddCv(idApp:any ,formData:FormData):Observable<CandidateApp> { 
    return this.http.put<CandidateApp>(this.baseUrl+"/uploadCv/"+idApp,formData); 
  }

  public SaveOffer(idApp:any ,idState:any,formData:FormData):Observable<CandidateApp> { 
    return this.http.put<CandidateApp>(this.baseUrl+"/uploadOffer/"+idApp+"/"+idState,formData); 
  }

  public GetPdf(id:any){
    return this.http.get(this.baseUrl+"/downloadPdf/"+id,{responseType: 'blob'}); 
    
  }


 



}
