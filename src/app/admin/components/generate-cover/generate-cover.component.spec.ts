import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerateCoverComponent } from './generate-cover.component';
import { CoverService } from '../../services/book/cover/cover.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('GenerateCoverComponent', () => {
  let component: GenerateCoverComponent;
  let fixture: ComponentFixture<GenerateCoverComponent>;
  let coverService: CoverService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ GenerateCoverComponent ],
      providers: [
        {
          provide: CoverService,
          useValue: {
            cover: jasmine.createSpy('cover').and.returnValue(of({data: ''}))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateCoverComponent);
    component = fixture.componentInstance;
    coverService = TestBed.inject(CoverService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the default values', () => {
    expect(component.bookIsbn).toBe('-1');
    expect(component.disabled).toBe(false);
    expect(component.textButton).toBe('Generate new cover');
  });

  it('should emit event and reset button text after cover is generated', () => {
    spyOn(component.bookCoverEvent, 'emit');
    component.generateCover();
    expect(coverService.cover).toHaveBeenCalledWith(component.bookIsbn);
    fixture.detectChanges();
    expect(component.bookCoverEvent.emit).toHaveBeenCalledWith(true);
    expect(component.disabled).toBe(false);
    expect(component.textButton).toBe('Generate new cover');
  });

  it('should trigger generateCover method when button is clicked', () => {
    spyOn(component, 'generateCover');
    const buttonDe: DebugElement = fixture.debugElement.query(By.css('button'));
    buttonDe.triggerEventHandler('click', null);
    expect(component.generateCover).toHaveBeenCalled();
  });
});
