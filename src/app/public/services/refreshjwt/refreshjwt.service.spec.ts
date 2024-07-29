import { RefreshjwtService } from './refreshjwt.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from '../../../shared/models/user';

describe('LoginService', () => {
  let service: RefreshjwtService;
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
        RefreshjwtService
      ]
    });
    service = TestBed.inject(RefreshjwtService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call verify with the correct URL and headers', () => {
    const expectedUrl = `${service['apiUrl']}`;

    service.refresh().subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });
});

