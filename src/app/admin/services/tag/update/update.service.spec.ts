
import { TestBed } from '@angular/core/testing';
import { UpdateService } from './update.service';
import { environment } from '../../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Tag } from '../../../../shared/models/tag';

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
    const tagId = 123;
    const tag: Tag | any = {
      title: 'test',
    }
    const expectedUrl = `${service['apiUrl']}${tagId}`;

    service.update(tagId, tag).subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});

