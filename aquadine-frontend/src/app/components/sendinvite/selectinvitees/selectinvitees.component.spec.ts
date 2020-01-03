import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectinviteesComponent } from './selectinvitees.component';

describe('SelectinviteesComponent', () => {
  let component: SelectinviteesComponent;
  let fixture: ComponentFixture<SelectinviteesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectinviteesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectinviteesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
