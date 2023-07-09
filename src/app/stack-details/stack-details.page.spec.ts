import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StackDetailsPage } from './stack-details.page';

describe('StackDetailsPage', () => {
  let component: StackDetailsPage;
  let fixture: ComponentFixture<StackDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StackDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
