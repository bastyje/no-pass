import { Component, OnInit } from '@angular/core';
import {
  TextInputWithInlineSubmitButtonComponent
} from '../shared/text-input-with-inline-submit-button/text-input-with-inline-submit-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ErrorComponent } from '../shared/error/error.component';
import { NgIf } from '@angular/common';
import { ErrorMessage } from '../../../models/error-message.model';
import { RegisterUser } from '../../../domain/identity/register-user.usecase';
import { RegistrationData } from '../../../domain/identity/registration-data';

type RegistrationForm = {
  loginId: string;
}

@Component({
  selector: 'np-register',
  standalone: true,
  imports: [
    TextInputWithInlineSubmitButtonComponent,
    ReactiveFormsModule,
    RouterLink,
    ErrorComponent,
    NgIf,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  protected errors: ErrorMessage[];
  protected registrationForm: FormGroup;
  private _registration: RegistrationForm;

  constructor(private formBuilder: FormBuilder, private register: RegisterUser) {}

  public ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      loginId: this._registration?.loginId
    });
  }

  protected onSubmit(): void {
    this.register.execute(<RegistrationData>{loginId: this.registrationForm.value.loginId}).subscribe({
      next: _ => {
        this.registrationForm.reset();
      }
    });
  }
}
