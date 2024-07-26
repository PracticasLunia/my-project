
import { TestBed } from '@angular/core/testing';
import { UpdateService } from './update.service';
import { environment } from '../../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../../shared/models/category';

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
    const categoryId = 123;
    const category: Category | any = {
      title: 'test',
    }
    const expectedUrl = `${service['apiUrl']}${categoryId}`;

    service.update(categoryId, category).subscribe();

    const req = mockHttp.expectOne(expectedUrl);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});

