
import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../../shared/models/user';

describe('RegisterService', () => {
  let service: RegisterService;
  let mockHttp: HttpTestingController;

  beforeEach(() => {
    const cookieServiceStub = {
      get: (key: string) => 'test-token'
    };

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        RegisterService
      ]
    });
    service = TestBed.inject(RegisterService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verify with the correct URL and headers', () => {
    const user: User = {
      id: 1,
      name: 'a',
      email: 'a',
      password: 'a',
      admin: false,
      verified: false
    }
    const expectedUrl = `${service['apiUrl']}`;

    service.register(user).subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});

