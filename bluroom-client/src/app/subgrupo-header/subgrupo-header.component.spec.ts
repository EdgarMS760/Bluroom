import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubgrupoHeaderComponent } from './subgrupo-header.component';

describe('SubgrupoHeaderComponent', () => {
  let component: SubgrupoHeaderComponent;
  let fixture: ComponentFixture<SubgrupoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubgrupoHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubgrupoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
