import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirecExamplesComponent } from './direc-examples.component';

describe('DirecExamplesComponent', () => {
  let component: DirecExamplesComponent;
  let fixture: ComponentFixture<DirecExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirecExamplesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DirecExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
