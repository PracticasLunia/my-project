import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FindService } from '../../services/user/find/find.service';
import { find, of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';


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
  const testUsers = [
    {id: 2, name: 'testName1', email: 'testEmail1'},
    {id: 3, name: 'testName2', email: 'testEmail2'}
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent, MockNavbarComponent, MockVerifyUserModalComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule],
      providers:[
        { provide: FindService, useValue: {find: jasmine.createSpy('find').and.returnValue(of(testUsers))}}
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
    expect(component.userList.length).toBe(2);
    expect(component.userList[0].id).toBe(2);
    expect(component.userList[0].name).toBe("testName1");
  });

  it('should search users', () => {
    component.searchName = 'testName';
    component.searchEmail = 'testEmail';
    component.searchUsers();
    fixture.detectChanges();

    expect(findService.find).toHaveBeenCalledWith('testName', 'testEmail');
    expect(component.userList.length).toBe(2);
    expect(component.userList[0].id).toBe(2);
    expect(component.userList[0].name).toBe('testName1');
    expect(component.userList[0].email).toBe('testEmail1');
    expect(component.userList[1].id).toBe(3);
    expect(component.userList[1].name).toBe('testName2');
    expect(component.userList[1].email).toBe('testEmail2');
  });
});

