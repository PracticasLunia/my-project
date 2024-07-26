/*import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VerifyUserModalComponent } from './new-category-modal.component';
import { VerifyService } from '../../services/user/verify/verify.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('VerifyUserModalComponent', () => {
  let component: VerifyUserModalComponent;
  let fixture: ComponentFixture<VerifyUserModalComponent>;
  let verifyService: VerifyService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyUserModalComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: VerifyService,
          useValue: {
            verify: jasmine.createSpy('verify').and.returnValue(of(void 0))
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyUserModalComponent);
    component = fixture.componentInstance;
    verifyService = TestBed.inject(VerifyService);
    spyOn(component, 'windowReload').and.callFake( () => {});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close the modal', () => {
    component.openModal();
    fixture.detectChanges();
    let modal: DebugElement = fixture.debugElement.query(By.css('div[role="dialog"]'));
    expect(modal).toBeTruthy();

    component.closeModal();
    fixture.detectChanges();
    modal = fixture.debugElement.query(By.css('div[role="dialog"]'));
    expect(modal).toBeFalsy();
  });

  it('should call verifyUser and verify service', () => {
    component.userId = 1;
    component.verifyUser();
    expect(verifyService.verify).toHaveBeenCalledWith(1);
  });

  it('should call openModal and set opened to true', () => {
    component.openModal();
    expect(component.opened).toBeTrue();
  });

  it('should call closeModal and set opened to false', () => {
    component.opened = true;
    component.closeModal();
    expect(component.opened).toBeFalse();
  });

  it('should disable verify button when verifing', () => {
    component.openModal();
    fixture.detectChanges();
    component.verifing = true;
    fixture.detectChanges();
    const button: HTMLButtonElement = fixture.debugElement.children[1].query((By.css('button'))).nativeElement;
    expect(button.disabled).toBeTruthy();
  });
});
*/
