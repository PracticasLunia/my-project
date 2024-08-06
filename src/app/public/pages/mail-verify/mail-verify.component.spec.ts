import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { MailVerifyComponent } from './mail-verify.component';
import { MailVerifyService } from '../../services/mail-verify/mail-verify.service';

class ActivatedRouteStub {
  snapshot = {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('test-token')
    }
  };
}

describe('MailVerifyComponent', () => {
  let component: MailVerifyComponent;
  let fixture: ComponentFixture<MailVerifyComponent>;
  let mailVerifyService: jasmine.SpyObj<MailVerifyService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async () => {
    const mailVerifySpy = jasmine.createSpyObj('MailVerifyService', ['verify']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [MailVerifyComponent],
      providers: [
        { provide: MailVerifyService, useValue: mailVerifySpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MailVerifyComponent);
    component = fixture.componentInstance;
    mailVerifyService = TestBed.inject(MailVerifyService) as jasmine.SpyObj<MailVerifyService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    activatedRoute = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call verify method on initialization with a valid token', () => {
    mailVerifyService.verify.and.returnValue(of(void 1));

    fixture.detectChanges(); // triggers ngOnInit

    expect(mailVerifyService.verify).toHaveBeenCalledWith('test-token');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
    expect(component.errorMessage).toBe('');
  });

  it('should set errorMessage on verify failure', () => {
    mailVerifyService.verify.and.returnValue(throwError('error'));

    fixture.detectChanges(); // triggers ngOnInit

    expect(mailVerifyService.verify).toHaveBeenCalledWith('test-token');
    expect(component.errorMessage).toBe('Something happened during your verification, please, try again later');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should not call verify method if token is null', () => {
    activatedRoute.snapshot.paramMap.get.and.returnValue(null)

    fixture.detectChanges(); // triggers ngOnInit

    expect(mailVerifyService.verify).not.toHaveBeenCalled();
    expect(component.errorMessage).toBe('');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
