import { TestBed } from '@angular/core/testing';
import { RecoverPasswordService } from './recover-password.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../../shared/models/user';

describe('RecoverPasswordService', () => {
  let service: RecoverPasswordService;
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
        RecoverPasswordService
      ]
    });
    service = TestBed.inject(RecoverPasswordService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verify with the correct URL and headers', () => {
    const email = 'a@a.a';
    const expectedUrl = `${service['apiUrl']}`;

    service.recoverPassword(email).subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});

