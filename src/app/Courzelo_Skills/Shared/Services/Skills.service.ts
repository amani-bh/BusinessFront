import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Macroskills } from '../entities/Macroskills';
import { Microskills } from '../entities/Microskills'


@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  macroskillsurl : string = "https://springgateway.herokuapp.com/skillcourzelo/skills";
  constructor(private http : HttpClient) { }
  GetMacrohardskills() : Observable<Macroskills[]>{ return this.http.get<Macroskills[]>(this.macroskillsurl+"/getHardMacroByIdUser/123");}
  GetMacrosoftskills() : Observable<Macroskills[]>{ return this.http.get<Macroskills[]>(this.macroskillsurl+"/getSoftMacroByIdUser/123");}
  GetMicrohardskills(name:string) : Observable<Microskills[]>{ return this.http.get<Microskills[]>(this.macroskillsurl+"/getHardMicroByIdUser/123/"+name);}
  GetMicrosoftskills(name:string) : Observable<Microskills[]>{ return this.http.get<Microskills[]>(this.macroskillsurl+"/getSoftMicroByIdUser/123/"+name);}
}
