import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }
  set=(name:string,value:string)=>{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 10);
    document.cookie = name + "=" + (value) + ";expires=" + exdate;

  }
  get=(name:string)=>{
    let cookies = document.cookie.split(";");
    for(let i = 0; i < cookies.length; i++)
    {
      let elements  = cookies[i].split("=");
      if(elements[0] == name)
      {
        return elements[1];
      }
    }
    return "";
  }
  delete=(name:string)=>{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() - 10);
    document.cookie = name + "=" + ("") + ";expires=" + exdate;
  }
}