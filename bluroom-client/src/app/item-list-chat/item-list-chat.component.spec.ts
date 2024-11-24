import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemListChatComponent } from './item-list-chat.component';

describe('ItemListChatComponent', () => {
  let component: ItemListChatComponent;
  let fixture: ComponentFixture<ItemListChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemListChatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemListChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
