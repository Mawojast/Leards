import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardCreateFormPage } from './card-create-form.page';

describe('CardCreateFormPage', () => {
  let component: CardCreateFormPage;
  let fixture: ComponentFixture<CardCreateFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CardCreateFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
