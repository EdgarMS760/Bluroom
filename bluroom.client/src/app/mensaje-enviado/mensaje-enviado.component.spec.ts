import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeEnviadoComponent } from './mensaje-enviado.component';

describe('MensajeEnviadoComponent', () => {
  let component: MensajeEnviadoComponent;
  let fixture: ComponentFixture<MensajeEnviadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MensajeEnviadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MensajeEnviadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
