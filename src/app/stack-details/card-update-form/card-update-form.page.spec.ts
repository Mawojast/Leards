import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardUpdateFormPage } from './card-update-form.page';

describe('CardUpdateFormPage', () => {
  let component: CardUpdateFormPage;
  let fixture: ComponentFixture<CardUpdateFormPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CardUpdateFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
