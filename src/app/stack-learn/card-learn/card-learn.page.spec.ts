import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardLearnPage } from './card-learn.page';

describe('CardLearnPage', () => {
  let component: CardLearnPage;
  let fixture: ComponentFixture<CardLearnPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CardLearnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
