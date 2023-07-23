import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StackFormPage } from './stack-form.page';

describe('StackFormPage', () => {
  let component: StackFormPage;
  let fixture: ComponentFixture<StackFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(StackFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
