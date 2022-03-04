import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './login/signup/signup.component';

const routes: Routes = [
  {path:"",component:SignupComponent},
  {path:"login/login",component:LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
