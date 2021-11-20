import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
    username = new FormControl('',Validators.required);
    password = new FormControl('',Validators.required);
    submitMessage=""

    constructor(private authentication:AuthenticationService, private router:RouterService) { }
    loginSubmit() {
      if(this.username.valid && this.password.valid){
      this.authentication.authenticateUser({"username":this.username.value,"password":this.password.value}).subscribe(
        (data) => {
          this.submitMessage = "";
          this.authentication.setBearerToken(data['token']);
          localStorage.setItem('isLoggedIn','true');
          this.router.routeToDashboard();
        },
        (error) => {
          if(error.status===403)this.submitMessage = "Unauthorized"
          else this.submitMessage = "Http failure response for http://localhost:3000/auth/v1: 404 Not Found"
        }
        
      )

    }
  }
}
