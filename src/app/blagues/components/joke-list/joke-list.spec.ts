import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing'; 
import { JokeListComponent } from './joke-list';

describe('JokeList', () => {
  let component: JokeListComponent;
  let fixture: ComponentFixture<JokeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JokeListComponent],
      providers: [ 
        provideHttpClient(), 
        provideHttpClientTesting() 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JokeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
