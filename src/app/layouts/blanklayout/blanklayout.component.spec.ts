import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlanklayoutComponent } from './blanklayout.component';

describe('BlanklayoutComponent', () => {
  let component: BlanklayoutComponent;
  let fixture: ComponentFixture<BlanklayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlanklayoutComponent]
    });
    fixture = TestBed.createComponent(BlanklayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
