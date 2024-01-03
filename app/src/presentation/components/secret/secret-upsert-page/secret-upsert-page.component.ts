import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecretFormComponent } from '../secret-form/secret-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'np-secret-upsert-page',
  standalone: true,
  imports: [CommonModule, SecretFormComponent, ReactiveFormsModule],
  templateUrl: './secret-upsert-page.component.html',
  styleUrl: './secret-upsert-page.component.scss'
})
export class SecretUpsertPageComponent {}
