import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  TextInputWithInlineSubmitButtonComponent
} from '../shared/text-input-with-inline-submit-button/text-input-with-inline-submit-button.component';
import { RouterLink } from '@angular/router';
import { ErrorComponent } from '../shared/error/error.component';
import { ErrorMessage } from '../../../models/error-message.model';
import { NgIf } from '@angular/common';
import { RegistrationData } from '../../../domain/identity/registration-data';
import { LoginUser } from '../../../domain/identity/login-user.usecase';
import { LoginData } from '../../../domain/identity/login-data';

type LoginForm = {
  loginId: string;
}

@Component({
  selector: 'np-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    TextInputWithInlineSubmitButtonComponent,
    ReactiveFormsModule,
    RouterLink,
    ErrorComponent,
    NgIf,
  ],
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {

  protected errors: ErrorMessage[];
  protected loginForm: FormGroup;
  private _login: LoginForm;

  constructor(private formBuilder: FormBuilder, private login: LoginUser) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      loginId: this._login?.loginId
    });
  }

  protected onSubmit(): void {
      this.login.execute(<LoginData>{loginId: this.loginForm.value.loginId}).subscribe({
      next: _ => {
        this.loginForm.reset();
      }
    });
  }
}
