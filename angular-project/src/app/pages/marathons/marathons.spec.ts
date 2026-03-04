import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Marathons } from './marathons';

describe('Marathons', () => {
  let component: Marathons;
  let fixture: ComponentFixture<Marathons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Marathons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Marathons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
