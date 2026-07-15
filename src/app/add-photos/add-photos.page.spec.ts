import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPhotosPage } from './add-photos.page';

describe('AddPhotosPage', () => {
  let component: AddPhotosPage;
  let fixture: ComponentFixture<AddPhotosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
