import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FindService } from '../../services/user/find/find.service';
import { find, of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';


@Component({
  selector: 'app-navbar',
  template: '<div>Navbar</div>'
})
class MockNavbarComponent {}

@Component({
  selector: 'app-verify-user-modal',
  template: '<div>Verify User Modal</div>'
})
class MockVerifyUserModalComponent {
  @Input() userName: string = "";
  @Input() userId: number = -1;
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let findService: FindService;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent, MockNavbarComponent, MockVerifyUserModalComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers:[
        { provide: FindService, useValue: {find: jasmine.createSpy('find').and.returnValue(of([{id: 1, name: "name", email: "email"}]))}}
      ]
    })
    .compileComponents();

    findService = TestBed.inject(FindService);
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user list on init', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(findService.find).toHaveBeenCalled();
    expect(component.userList.length).toBe(1);
    expect(component.userList[0].id).toBe(1);
    expect(component.userList[0].name).toBe("name");
  })
});

