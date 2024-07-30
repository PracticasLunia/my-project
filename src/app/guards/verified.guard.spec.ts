import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { VerifiedGuard } from './verified.guard';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { VerifiedService } from '../shared/services/verified/verified.service';

describe('VerifiedGuard', () => {
  let guard: VerifiedGuard;
  let verifiedService: jasmine.SpyObj<VerifiedService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const verifiedServiceSpy = jasmine.createSpyObj('VerifiedService', ['isVerified']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        VerifiedGuard,
        { provide: VerifiedService, useValue: verifiedServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(VerifiedGuard);
    verifiedService = TestBed.inject(VerifiedService) as jasmine.SpyObj<VerifiedService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is verified', fakeAsync(() => {
    verifiedService.isVerified.and.returnValue(of(void 1));

    let result = guard.canActivate();
    tick();

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('should navigate to not-verified if an error is thrown', fakeAsync(() => {
    verifiedService.isVerified.and.throwError(new Error('error'));

    let result = guard.canActivate();
    tick();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/not-verified']);
  }));

  it('should navigate to not-verified if an error is thrown', fakeAsync(() => {
    verifiedService.isVerified.and.returnValue(throwError('error'));

    let result = guard.canActivate();
    tick();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/not-verified']);
  }));
});
