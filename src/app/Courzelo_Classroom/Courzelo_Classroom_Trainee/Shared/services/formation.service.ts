import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Formation } from '../entities/Formation';
import { User } from '../../Shared/entities/User';
import { Inscription } from '../../Shared/entities/Inscription';
const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'mon-entete-personnalise':'maValeur'
  })};
const API_URL = 'https://springgateway.herokuapp.com/courzeloclassroom';
const API_URL_USER = 'https://springgateway.herokuapp.com/auth-herokuu';
@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(protected httpClient: HttpClient) {  }

  getAllFormations() {

    return this.httpClient.get<Formation[]>(API_URL+"/api/Formations");
  }
  getFormationsById(id:any) {

    return this.httpClient.get<Formation>(API_URL+"/api/Formations/"+id);

  }
  getFormationsByTest(test:Boolean,id:any) {

    return this.httpClient.get<Formation[]>(API_URL+"/api/Formations/coursA/"+test+"/user/"+id);

  }
  addFormations(id:any,formation:Formation) {

    return this.httpClient.post(API_URL+"/api/Formations/"+id,formation);

  }
  UpdateFormations(id:any,formation:Formation) {

    return this.httpClient.put(API_URL+"/api/Formations/"+id,formation);

  }
  getFormationsByIdStudent(id:any) {

    return this.httpClient.get<Formation[]>(API_URL+"/api/Formations/student/"+id);

  }
  getFormationsByIdCreator(id:any) {

    return this.httpClient.get<Formation[]>(API_URL+"/api/Formations/creator/"+id);

  }
  deleteFormationsById(id:any) {

    return this.httpClient.delete(API_URL+"/api/Formations/"+id);

  }
  getUserById(id:any) {

    return this.httpClient.get<User>(API_URL_USER+"/api/auth/getUser/"+id);
  }
  getListUserParticipant(id:any) {

    return this.httpClient.get<User[]>(API_URL+"/api/Inscriptions/"+id);
  }
  Inscription(idEtudiant:any,idFormation:any,inscription:Inscription) {

    return this.httpClient.post(API_URL+"/api/Inscriptions/"+idEtudiant+"/Formation/"+idFormation,inscription);
  }

  addquizz(id:any,idquiz:any) {

    return this.httpClient.put(API_URL+"/api/Formations/Quiz/"+id+"/"+idquiz,null);

}
}
