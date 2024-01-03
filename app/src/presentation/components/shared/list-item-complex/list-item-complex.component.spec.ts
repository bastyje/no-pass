import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComplexComponent } from './list-item-complex.component';

describe('ListItemComplexComponent', () => {
  let component: ListItemComplexComponent;
  let fixture: ComponentFixture<ListItemComplexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListItemComplexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListItemComplexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
