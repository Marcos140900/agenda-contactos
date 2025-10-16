/// <reference types="jasmine" />

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerLayoutwebComponent } from './logger-layoutweb.component';

describe('LoggerLayoutwebComponent', () => {
  let component: LoggerLayoutwebComponent;
  let fixture: ComponentFixture<LoggerLayoutwebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggerLayoutwebComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggerLayoutwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
