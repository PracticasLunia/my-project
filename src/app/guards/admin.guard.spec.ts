import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { AdminGuard } from './admin.guard';
import { Router } from '@angular/router';
import { AdminService } from '../admin/services/user/admin/admin.service';
import { Observable, of, throwError } from 'rxjs';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let adminService: jasmine.SpyObj<AdminService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const adminServiceSpy = jasmine.createSpyObj('AdminService', ['isAdmin']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AdminService, useValue: adminServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AdminGuard);
    adminService = TestBed.inject(AdminService) as jasmine.SpyObj<AdminService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is admin', fakeAsync(() => {
    adminService.isAdmin.and.returnValue(of(void 1));

    let result = guard.canActivate();
    tick();

    expect(result).toBeTrue();
    expect(router.navigate).not.toHaveBeenCalled();
  }));

  it('should navigate to not-admin if an error is thrown', fakeAsync(() => {
    adminService.isAdmin.and.throwError(new Error('error'));

    let result = guard.canActivate();
    tick();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/not-admin']);
  }));

  it('should navigate to not-admin if an error is thrown', fakeAsync(() => {
    adminService.isAdmin.and.returnValue(throwError('error'));

    let result = guard.canActivate();
    tick();

    expect(result).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/not-admin']);
  }));
});
