import { APP_BASE_HREF } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BlueriqModule } from '@blueriq/angular';
import { BlueriqTestingModule } from '@blueriq/angular/testing';
import { AppComponent } from './app.component';
import { MaterialModule } from './blueriq/material/material.module';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        FormsModule,
        FlexLayoutModule,
        BlueriqModule.forRoot(),
        BlueriqTestingModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    });
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
});
