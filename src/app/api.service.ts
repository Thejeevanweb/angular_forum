import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl="http://localhost:8081/";

  constructor(private http:HttpClient) { }
  post=(api:string,data:any)=>{
    const headers = {'content-type': 'application/json'}
    return this.http.post(this.baseurl+api,data,  {'headers':headers});
  }
  get=(api:string,data:any)=>{
    return this.http.get(this.baseurl+api,data);
  }
}