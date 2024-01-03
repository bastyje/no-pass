import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretSidebarHeaderComponent } from './secret-sidebar-header.component';

describe('SecretSidebarHeaderComponent', () => {
  let component: SecretSidebarHeaderComponent;
  let fixture: ComponentFixture<SecretSidebarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecretSidebarHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecretSidebarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
