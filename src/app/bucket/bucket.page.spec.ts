import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BucketPage } from './bucket.page';

describe('BucketPage', () => {
  let component: BucketPage;
  let fixture: ComponentFixture<BucketPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
