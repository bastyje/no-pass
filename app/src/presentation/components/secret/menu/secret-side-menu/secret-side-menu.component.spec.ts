import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretSideMenuComponent } from './secret-side-menu.component';

describe('SecretSideMenuComponent', () => {
  let component: SecretSideMenuComponent;
  let fixture: ComponentFixture<SecretSideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretSideMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecretSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
