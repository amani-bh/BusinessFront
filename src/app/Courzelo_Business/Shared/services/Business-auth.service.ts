import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

const AUTH_API = 'https://springgateway.herokuapp.com/business-auth/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BusinessAuthService {
  constructor(private http: HttpClient) { }

    
  public GetCountries() {
    return this.http.get('https://restcountries.com/v2/all')
  }
  
  public GetActive():Observable<any> {
    return this.http.get<any>(AUTH_API+"active" )
  }

  public GetInactive():Observable<any> {
    return this.http.get<any>(AUTH_API+"inactive" )
  }

  public ActivateUser(userId:any):Observable<any> {
    return this.http.post<any>(AUTH_API+"activateCompte/"+userId,null )
  }


  public VerifMail(email:any):Observable<any> {
    return this.http.get<any>(AUTH_API+"verifMail/"+email )
  }


  public VerifName(companyName:any):Observable<any> {
    return this.http.get<any>(AUTH_API+"verifCompanyName/"+companyName )
  }

  public GetUserById(userId:any):Observable<any> {
    return this.http.get<any>(AUTH_API+userId )
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }

  register(companyName: string, email: string, password: string,website:String,nbEmployee:String,
    firstName:String,lastName:String,recrutementRole:String,phone:String,
    industry:String,country:String,address:String,logo:String,
    description:String,creationDate:Date): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      companyName,
      email,
      password,
      website,
      nbEmployee,
      firstName,lastName,recrutementRole,phone,industry,country,address,logo,description,creationDate
    }, httpOptions);
  }

  forgetPassword(e: any){
    return this.http.post(AUTH_API + 'forgotPassword?email=' +e,null,{ responseType: 'text'})
  }


  
  resetPassword(password: any, resetPasswordToken: any): Observable<any>{
    return this.http.post(AUTH_API + 'ChangePassword?password=' + password + '&token=' + resetPasswordToken,{
      password: password,
      resetPasswordToken: resetPasswordToken
    });
  }


}
