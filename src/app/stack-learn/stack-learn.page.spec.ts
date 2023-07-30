import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StackLearnPage } from './stack-learn.page';

describe('StackLearnPage', () => {
  let component: StackLearnPage;
  let fixture: ComponentFixture<StackLearnPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StackLearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
