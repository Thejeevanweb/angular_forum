import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { CookieService } from 'src/app/cookie.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup: any;
  id:string | null = "";
  image:string="";

  constructor(private api: ApiService, private cookie: CookieService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if(this.id != "0")
    {
      let apiurl = "authentication/get";
      let data = this.api.post(apiurl, { data: { id: this.id } });
      data.subscribe((mydata: any) => {
        this.signup = mydata.data;
        this.show();
      });
    }
    this.show();
  }

  show = ()=>{
    this.signup = new FormGroup({
      id: new FormControl(this.signup == null ? "" : this.signup._id),
      email: new FormControl(this.signup == null ? "" : this.signup.email, Validators.compose([Validators.required])),
      mobileno: new FormControl(this.signup == null ? "" : this.signup.mobileno, Validators.compose([Validators.required])),
      username: new FormControl(this.signup == null ? "" : this.signup.username, Validators.compose([Validators.required])),
      password: new FormControl(this.signup == null ? "" : this.signup.password, Validators.compose([Validators.required])),

      joiningdate: new FormControl(this.signup == null ? "" : this.signup.joiningdate, Validators.compose([Validators.required])),
      
      imagepath: new FormControl(""),
    });
  }

  submit = (signup: any) => {
    let apiurl = "authentication/save";
    // signup.photocode=this.image;
    let data = this.api.post(apiurl, { data: signup });
    data.subscribe((mydata: any) => {
     console.log(data);
    //  this.router.navigate(["login/login"])
    });
  }

  handleUpload(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      if(reader.result != null)
        this.image = reader.result.toString();
    }
  }
}
