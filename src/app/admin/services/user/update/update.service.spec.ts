
import { TestBed } from '@angular/core/testing';
import { UpdateService } from './update.service';
import { environment } from '../../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../../shared/models/user';

describe('UpdateService', () => {
  let service: UpdateService;
  let mockHttp: HttpTestingController;
  let mockCookieService: CookieService;

  beforeEach(() => {
    const cookieServiceStub = {
      get: (key: string) => 'test-token'
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: CookieService, useValue: cookieServiceStub},
        UpdateService
      ]
    });
    service = TestBed.inject(UpdateService);
    mockHttp = TestBed.inject(HttpTestingController);
    mockCookieService = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verify with the correct URL and headers', () => {
    const userId = 123;
    const user: User = {
      id: userId,
      name: 'a',
      email: 'a',
      password: 'a',
      admin: false,
      verified: false
    }
    const expectedUrl = `${service['apiUrl']}${userId}`;

    service.update(userId, user).subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });
});

