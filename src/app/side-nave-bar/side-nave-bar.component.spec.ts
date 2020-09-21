import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNaveBarComponent } from './side-nave-bar.component';

describe('SideNaveBarComponent', () => {
  let component: SideNaveBarComponent;
  let fixture: ComponentFixture<SideNaveBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNaveBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNaveBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
