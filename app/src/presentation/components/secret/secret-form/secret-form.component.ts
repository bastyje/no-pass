import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../shared/text-input/text-input.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormButtonGroupComponent } from '../../shared/form-button-group/form-button-group.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateSecret } from '../../../../domain/secret/create-secret.usecase';
import { Secret } from '../../../../domain/secret/secret';
import { GetSecret } from '../../../../domain/secret/get-secret.usecase';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, of } from 'rxjs';
import { UpdateSecret } from '../../../../domain/secret/update-secret.usecase';

@Component({
  selector: 'np-secret-form',
  standalone: true,
  imports: [ CommonModule, TextInputComponent, ButtonComponent, FormButtonGroupComponent, ReactiveFormsModule ],
  templateUrl: './secret-form.component.html',
  styleUrl: './secret-form.component.scss',
})
export class SecretFormComponent implements OnInit {

  protected secretForm: FormGroup;
  private isCreate: boolean;

  constructor(
  private formBuilder: FormBuilder,
  private createSecret: CreateSecret,
  private updateSecret: UpdateSecret,
  private route: ActivatedRoute,
  private getSecret: GetSecret,
  ) {}

  public ngOnInit(): void {
    this.initForm();
    this.route.paramMap.subscribe(paramMap => {
      const id = paramMap.get('id');
      this.isCreate = id === null || id === 'add';
      if (!this.isCreate) {
        this.getSecret.execute(id as string).subscribe(response => {
          if (response.success) {
            const secret = response.content;
            this.secretForm = this.formBuilder.group({
              id: id,
              name: secret.plain.name,
              websiteAddress: secret.plain.websiteAddress,
              loginId: secret.plain.loginId,
              password: secret.plain.password,
              notes: secret.plain.notes,
            });
          }
        });
      } else {
        this.initForm();
      }
    });
  }

  protected onSubmit(): void {
    of(new Secret(this.secretForm.value.id, {
      name: this.secretForm.value.name,
      websiteAddress: this.secretForm.value.websiteAddress,
      loginId: this.secretForm.value.loginId,
      password: this.secretForm.value.password,
      notes: this.secretForm.value.notes,
    })).pipe(mergeMap(secret => this.isCreate
      ? this.createSecret.execute(secret)
      : this.updateSecret.execute(secret)
    )).subscribe({
      next: _ => {
        // this.secretForm.reset();
      }
    });
  }

  private initForm(): void {
    this.secretForm = this.secretForm = this.formBuilder.group({
      id: null,
      name: null,
      websiteAddress: null,
      loginId: null,
      password: null,
      notes: null,
    });
  }
}
