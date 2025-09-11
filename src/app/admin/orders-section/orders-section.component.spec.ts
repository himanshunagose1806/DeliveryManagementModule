import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSectionComponent } from './orders-section.component';

describe('OrdersSectionComponent', () => {
  let component: OrdersSectionComponent;
  let fixture: ComponentFixture<OrdersSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
