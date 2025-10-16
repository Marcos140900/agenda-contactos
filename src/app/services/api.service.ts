import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoadingService } from './loading.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  loadingService = inject(LoadingService);

 
  async get(URI:string){
    const token = localStorage.getItem("token");
    let headers:HeadersInit = {}
    if(token) headers = {...headers, Authorization: "Bearer "+token };
    this.loadingService.addLoad(URI);
    try{
      const res = await fetch(environment.API_URL+URI,{
        headers
      })
      this.loadingService.deleteLoad(URI);
      return res; 
    }
    catch {
      this.loadingService.deleteLoad(URI);
      return null
    }
  }

 async post(URI:string,body:any){
    if(typeof body !== "object" && typeof body !== "string") return;
    const token = localStorage.getItem("token");
    let headers:HeadersInit = { "content-type" : "Application/json" }
    if(token) headers = {...headers, Authorization: "Bearer "+token };
    this.loadingService.addLoad(URI);
    try{
      const res = await fetch(environment.API_URL+URI,{
        method: "POST",
        headers,
        body: typeof body === "string" ? body : JSON.stringify(body),
      })
      this.loadingService.deleteLoad(URI);
      return res;
    } catch {
      this.loadingService.deleteLoad(URI);
      return null
    }
  }

 async put(URI:string,body?:any){
  if(typeof body !== "object" && typeof body !== "string") return;
    const token = localStorage.getItem("token");
    let headers:HeadersInit = { "content-type" : "Application/json" }
    if(token) headers = {...headers, Authorization: "Bearer "+token };
    this.loadingService.addLoad(URI);
    try{
      const res = await fetch(environment.API_URL+URI,{
        method: "PUT",
        headers,
        body: typeof body === "string" ? body : JSON.stringify(body),
      })
      this.loadingService.deleteLoad(URI);
      return res;
    }
    catch {
      this.loadingService.deleteLoad(URI);
      return null
    }
  }

 async delete(URI:string){
    const token = localStorage.getItem("token");
    let headers:HeadersInit = {}
    if(token) headers = {...headers, Authorization: "Bearer "+token };
    this.loadingService.addLoad(URI);
    try{
      const res = await fetch(environment.API_URL+URI,{
        method: "DELETE",
        headers,
      })
      this.loadingService.deleteLoad(URI);
      return res;
    } catch {
      this.loadingService.deleteLoad(URI);
      return null
    }
  }
  
}
