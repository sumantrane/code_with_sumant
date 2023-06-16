import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User, userResponse } from '../shared/user.interface';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatProgressBarModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
})
export class LoginComponent {
  userForm: FormGroup;
  durationInSeconds = 5;
  error: string = '';
  loading = false;
  submitted = false;

  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}
  isLoggedIn: userResponse;
  ngOnInit() {
    this.userForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  showErrorSnackbar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: 'error-snackbar',
    });
  }
  get f() {
    return this.userForm.controls;
  }
  onSubmit(data: any) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    const user: User = {
      email: data.value.email,
      password: data.value.password,
    };

    this.loading = true;
    this._loginService
      .login(user)
      .pipe(first())
      .subscribe({
        next: () => {
          this._router.navigate(['/products']);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
          this.showErrorSnackbar(error);
        },
      });
  }
}
