import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  selectedImage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/)]],
      avatar: ['', [Validators.required, RxwebValidators.image({ maxHeight: 100, maxWidth: 100 }),
      RxwebValidators.extension({ extensions: ["jpeg", "png"] })]],
    });
  }

  onFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        this.signupForm.controls['avatar'].setValue(base64Image);
        this.selectedImage = base64Image;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.loading = true;
      const userDetails = this.signupForm.value;
      this.authService.signup(userDetails).subscribe(
        response => {
          console.log('Registration successful', response);
          this.loading = false;
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error during registration', error);
          this.loading = false;
        }
      );
    }
  }

}





