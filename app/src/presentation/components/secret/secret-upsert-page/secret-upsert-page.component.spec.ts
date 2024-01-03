import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretUpsertPageComponent } from './secret-upsert-page.component';

describe('SecretUpsertPageComponent', () => {
  let component: SecretUpsertPageComponent;
  let fixture: ComponentFixture<SecretUpsertPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretUpsertPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecretUpsertPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
