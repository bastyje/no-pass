import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpSidebarHeaderComponent } from './help-sidebar-header.component';

describe('HelpSidebarHeaderComponent', () => {
  let component: HelpSidebarHeaderComponent;
  let fixture: ComponentFixture<HelpSidebarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpSidebarHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HelpSidebarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
