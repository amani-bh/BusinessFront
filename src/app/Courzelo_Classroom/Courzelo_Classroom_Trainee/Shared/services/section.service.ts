import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Section } from '../entities/Section';
const API_URL = 'https://springgateway.herokuapp.com/courzeloclassroom';
@Injectable({
  providedIn: 'root'
})
export class SectionService {

  
  constructor(protected httpClient: HttpClient) {  }

  addSection(id:any,section:Section) {

    return this.httpClient.post(API_URL+"/api/Sections/"+id,section);

  }
  getSectionByIdFormation(id:any) {

    return this.httpClient.get<Section[]>(API_URL+"/api/Sections/formation/"+id);

  }

  getSectionById(id:any) {

    return this.httpClient.get<Section>(API_URL+"/api/Sections/"+id);

  }
  UpdateSection(id:any,section:Section) {

    return this.httpClient.put(API_URL+"/api/Sections/updateName/"+id,section);

  }
  deleteSectionById(id:any) {

    return this.httpClient.delete(API_URL+"/api/Sections/"+id);
}

getAllSections() {

  return this.httpClient.get<Section[]>(API_URL+"/api/Sections");
}
}