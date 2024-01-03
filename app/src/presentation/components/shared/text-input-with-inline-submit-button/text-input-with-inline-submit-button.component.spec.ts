import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputWithInlineSubmitButtonComponent } from './text-input-with-inline-submit-button.component';

describe('TextInputWithInlineSubmitButtonComponent', () => {
  let component: TextInputWithInlineSubmitButtonComponent;
  let fixture: ComponentFixture<TextInputWithInlineSubmitButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInputWithInlineSubmitButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextInputWithInlineSubmitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
