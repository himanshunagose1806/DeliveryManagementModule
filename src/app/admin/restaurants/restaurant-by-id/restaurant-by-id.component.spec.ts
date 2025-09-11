import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantByIDComponent } from './restaurant-by-id.component';

describe('RestaurantByIDComponent', () => {
  let component: RestaurantByIDComponent;
  let fixture: ComponentFixture<RestaurantByIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantByIDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantByIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
