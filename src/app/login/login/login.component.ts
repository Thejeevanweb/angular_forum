import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'src/app/cookie.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:any;

  constructor(private api:ApiService,private cookie:CookieService,private router:Router,private http:HttpClient) {

   }

  ngOnInit(): void {
    this.user=new FormGroup(
      {
        username:new FormControl("",Validators.compose([Validators.required,Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])),
        password:new FormControl("",Validators.compose([Validators.required])),
      }
    );

  }


  submit=(user:any)=>{
    // this.router.navigate(["/admin/dashboard"]);


    let apiurl = "authentication/login";
    let data=this.api.post(apiurl,{data:user});
    data.subscribe((mydata:any)=>{
      console.log(mydata);
      if(mydata.data.status =="success"){
        this.cookie.set("usertype","admin");
        this.cookie.set("authkey",mydata.data.authkey);
        this.router.navigate(["/admin/dashboard"]);
      }
      else{
        alert("Invalid Email OR Password");
      }
    })


  }


}