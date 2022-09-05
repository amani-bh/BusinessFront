import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Business } from '../entities/Business';

// const AUTH_API = 'https://springgateway.herokuapp.com/business-auth/api/auth/';
const AUTH_API = 'http://localhost:8090/api/auth/';

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

/***************** 
 * Sub accounts
 *****************/

 registerSubAccount( email: string, password: string,
  firstName:String,lastName:String,phone:String,creationDate:Date,idBusiness:String, roles:string[] ): Observable<any> {
  return this.http.post(AUTH_API + 'createSubAccount/'+idBusiness, {
    email,
    password,
    firstName,lastName,phone,creationDate,roles
  }, httpOptions);
}
public GetAllSubAccount(businessId:any):Observable<any> {
  return this.http.get<any>(AUTH_API+'getAllSubAccount/'+businessId )
}
public updateSubAccount(businessId:any ,email: string,firstName:String,lastName:String, password: string,
  phone:String, roles:string[]):Observable<any> {
  return this.http.post(AUTH_API + 'updateSubAccount/'+businessId,{ 
    email,
    password,
    firstName,lastName,phone,roles
  }, httpOptions);
}
public Delete(id:any) {
  return this.http.delete(AUTH_API + "deleteSubAccount/"+id);
}
public VerifySubAccount(code:any):Observable<any> {
  return this.http.get<any>(AUTH_API+"verifySubAccount/"+code )
}

update(businessId:any ,companyName: string, email: string, password: string,website:String,nbEmployee:String,
  firstName:String,lastName:String,recrutementRole:String,phone:String,
  industry:String,country:String,address:String,
  description:String): Observable<any> {
  return this.http.post(AUTH_API + 'updateAccount/'+businessId, {
    companyName,
    email,
    password,
    website,
    nbEmployee,
    firstName,lastName,recrutementRole,phone,industry,country,address,description
  }, httpOptions);
}
public AddCourseToBusinessUser(businessId:any,courseId:any):Observable<any> {
  return this.http.get<any>(AUTH_API+'addCourseToBusinessUser/'+businessId+'/'+courseId )
}
}


