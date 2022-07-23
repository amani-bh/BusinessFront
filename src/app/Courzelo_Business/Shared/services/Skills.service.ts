import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Macroskills } from 'src/app/Courzelo_Skills/Shared/entities/Macroskills';
import { Microskills } from 'src/app/Courzelo_Skills/Shared/entities/Microskills';


@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  macroskillsurl : string = "https://springgateway.herokuapp.com/skillcourzelo/skills";
  constructor(private http : HttpClient) { }
  GetMacrohardskills(id:any) : Observable<Macroskills[]>{ return this.http.get<Macroskills[]>(this.macroskillsurl+"/getHardMacroByIdUser/"+id);}
  GetMacrosoftskills(id:any) : Observable<Macroskills[]>{ return this.http.get<Macroskills[]>(this.macroskillsurl+"/getSoftMacroByIdUser/"+id);}
  GetMicrohardskills(id:any,name:string) : Observable<Microskills[]>{ return this.http.get<Microskills[]>(this.macroskillsurl+"/getHardMicroByIdUser/"+id+"/"+name);}
  GetMicrosoftskills(id:any,name:string) : Observable<Microskills[]>{ return this.http.get<Microskills[]>(this.macroskillsurl+"/getSoftMicroByIdUser/"+id+"/"+name);}
}
