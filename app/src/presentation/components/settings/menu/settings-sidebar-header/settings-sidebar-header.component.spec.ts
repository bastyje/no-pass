import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSidebarHeaderComponent } from './settings-sidebar-header.component';

describe('SettingsSidebarHeaderComponent', () => {
  let component: SettingsSidebarHeaderComponent;
  let fixture: ComponentFixture<SettingsSidebarHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsSidebarHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsSidebarHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
