import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signinForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(    private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.signinForm.invalid) {
      this.loading = true;
      const userDetails = this.signinForm.value;
      this.authService.login(userDetails).subscribe(
        response => {
          console.log('Login successful', response);
          this.loading = false;
        },
        error => {
          console.error('Error during login', error);
          this.loading = false;
        }
      );
    }
  }

}
