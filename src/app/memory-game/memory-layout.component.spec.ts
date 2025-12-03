import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoryLayoutComponent } from './memory-layout.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('MemoryLayoutComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FontAwesomeModule,
        MemoryLayoutComponent 
      ],
    }).compileComponents();
  }));
  it('should create the layout', () => {
    const fixture = TestBed.createComponent(MemoryLayoutComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
