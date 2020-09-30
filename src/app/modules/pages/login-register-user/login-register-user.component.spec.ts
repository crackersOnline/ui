import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterUserComponent } from './login-register-user.component';

describe('LoginRegisterUserComponent', () => {
  let component: LoginRegisterUserComponent;
  let fixture: ComponentFixture<LoginRegisterUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRegisterUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
