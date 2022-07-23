import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ConfigResponse {

    id:string;
    EmbedUrl: string;
    accessToken:string;
  }

  
@Injectable({
  providedIn: 'root'
})
export class PowerbiService {
  constructor(private httpClient: HttpClient) {}

  
  getEmbedConfig(endpoint: string): Observable<ConfigResponse> {
    return this.httpClient.get<ConfigResponse>(endpoint);
  }
}
