import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {LoginService} from "../../services/login-service.service";
import {NavController} from "ionic-angular";
import {HelloIonicPage} from "../hello-ionic/hello-ionic";

@Component({
  selector: 'ui-login',
  templateUrl: './login-ionic.template.html'
})
export class LoginIonicPage implements OnInit{
  show_password_error: boolean = false;
  show_username_error: boolean = false;
  login: FormGroup;
  username: string;
  password: string;
  user_detail: any;

  constructor(
    protected _LoginService: LoginService,
    public navCtrl: NavController
  ) {}

  ngOnInit(){
    this.login = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  authenticateUser(){
    this.username = this.login.controls['username'].value;
    this.password = this.login.controls['password'].value;

    this._LoginService.getCridentials()
      .subscribe(
        (user) => {
          this.user_detail = user;
          if(this.username === this.user_detail.name && this.password === this.user_detail.password){
            localStorage.setItem('name', this.user_detail.name);
            this.navCtrl.push(HelloIonicPage);
          }

          // error message username
          if(this.username != this.user_detail.name){
            this.show_username_error = true;
          }

          // error message password
          if(this.password != this.user_detail.password){
            this.show_password_error = true;
          }
        }
      )
  }
}
