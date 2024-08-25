import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoSubgrupoComponent } from './grupo-subgrupo.component';

describe('GrupoSubgrupoComponent', () => {
  let component: GrupoSubgrupoComponent;
  let fixture: ComponentFixture<GrupoSubgrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrupoSubgrupoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrupoSubgrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
