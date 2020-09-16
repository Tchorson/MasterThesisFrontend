import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FugitivesComponent } from './fugitives.component';

describe('FugitivesComponent', () => {
  let component: FugitivesComponent;
  let fixture: ComponentFixture<FugitivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FugitivesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FugitivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
