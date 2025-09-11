import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAssignmentComponent } from './agent-assignment.component';

describe('AgentAssignmentComponent', () => {
  let component: AgentAssignmentComponent;
  let fixture: ComponentFixture<AgentAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgentAssignmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
