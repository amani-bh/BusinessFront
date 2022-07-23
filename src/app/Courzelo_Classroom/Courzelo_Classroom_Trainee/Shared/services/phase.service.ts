import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Phase } from '../entities/Phase';
const API_URL = 'https://springgateway.herokuapp.com/courzeloclassroom';
@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  constructor(protected httpClient: HttpClient) { }

  addPhase(id:any,phase:FormData) {

    return this.httpClient.post(API_URL+"/api/Phases/"+id,phase);

  }
  getPhaseByIdSection(id:any) {

    return this.httpClient.get<Phase[]>(API_URL+"/api/Phases/section/"+id);

  }

  getPhaseById(id:any) {

    return this.httpClient.get<Phase>(API_URL+"/api/Phases/"+id);

  }
  UpdatePhase(id:any,phase:FormData) {

    return this.httpClient.put(API_URL+"/api/Phases/"+id,phase);

  }
  deletePhaseById(id:any) {

    return this.httpClient.delete(API_URL+"/api/Phases/"+id);
}
}
