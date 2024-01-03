import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormButtonGroupComponent } from './form-button-group.component';

describe('FormButtonGroupComponent', () => {
  let component: FormButtonGroupComponent;
  let fixture: ComponentFixture<FormButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormButtonGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
