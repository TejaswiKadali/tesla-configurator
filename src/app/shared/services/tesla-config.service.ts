import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ConfigOptions, StandardModel } from '../../models/tesla.models';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeslaConfigService {
  subscription: Subscription | undefined;

  private readonly http = inject(HttpClient);

  private readonly API = 'https://interstate21.com/tesla-app/images';

  downloadPhoto(model: string, color: string) {
    return this.http.get(`${this.API}/${model}/${color}.jpg`, { responseType: 'blob' })
  }

  fetchModels() {
     return this.http.get<StandardModel[]>('/models')
  }

  fetchDescription(model: string){
  return  this.http.get<ConfigOptions>(`options/${model}`)
  }

  
}

