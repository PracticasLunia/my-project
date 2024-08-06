import { TestBed } from '@angular/core/testing';
import { UpdatePasswordService } from './update-password.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../../shared/models/user';

describe('UpdatePasswordService', () => {
  let service: UpdatePasswordService;
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
        UpdatePasswordService
      ]
    });
    service = TestBed.inject(UpdatePasswordService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verify with the correct URL and headers', () => {
    const token = 'token';
    const password = 'a';
    const expectedUrl = `${service['apiUrl']}${token}`;

    service.updatePassword(token, password).subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});

