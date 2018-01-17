import { Component, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginUser } from '../model/login-user';
import { LoginUserService } from '../service/login-user.service';


@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})

export class LoginUserComponent {

  // Declaration of instance variable
  statusCode: number;

  loginUserForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  // Create constructor to get service instance
  constructor(private loginUserService: LoginUserService) {
  }

  // Handle Login User Here
  onLoginUserFormSubmit() {
    let email = '';
    let password = '';
    let userId = '';

    email = this.loginUserForm.get('email').value.trim();
    alert(email);
    password = this.loginUserForm.get('password').value.trim();
    alert(password);
    userId = '';
    const loginUser = new LoginUser(userId, email, password);

    this.loginUserService.loginUser(loginUser)
      .subscribe(successCode => {
        this.statusCode = successCode;
      },
      errorCode => this.statusCode = errorCode);
  }

}
