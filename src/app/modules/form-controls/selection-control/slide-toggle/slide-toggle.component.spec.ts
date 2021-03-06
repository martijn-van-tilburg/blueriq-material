import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlueriqComponents } from '@blueriq/angular';
import { BlueriqSessionTemplate, BlueriqTestingModule, BlueriqTestSession } from '@blueriq/angular/testing';
import { FieldTemplate } from '@blueriq/core/testing';
import { MaterialModule } from '../../../../material.module';
import { BqPresentationStyles } from '../../../BqPresentationStyles';
import { SelectionControlComponent } from '../selection-control.component';
import { SlideToggleComponent } from './slide-toggle.component';

describe('SlideToggleComponent', () => {
  let field: FieldTemplate;
  let component: ComponentFixture<SlideToggleComponent>;
  let session: BlueriqTestSession;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlideToggleComponent, SelectionControlComponent],
      providers: [BlueriqComponents.register([SlideToggleComponent])],
      imports: [
        MaterialModule,
        BrowserAnimationsModule, // or NoopAnimationsModule
        BlueriqTestingModule,
        FlexLayoutModule,
        FormsModule
      ]
    });
  }));

  beforeEach(() => {
    field = FieldTemplate.boolean();
    field.styles(BqPresentationStyles.TOGGLE);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SlideToggleComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be changed', () => {
    session.update(
      field.value('true')
    );
    let inputField = component.nativeElement.querySelector('.mat-checked');
    expect(inputField).toBeTruthy();

    session.update(
      field.value('false')
    );
    inputField = component.nativeElement.querySelector('.mat-checked');
    expect(inputField).toBeFalsy();
  });

  it('should be disabled', () => {
    field.styles(BqPresentationStyles.TOGGLE, BqPresentationStyles.DISABLED);
    session = BlueriqSessionTemplate.create().build(field);
    component = session.get(SlideToggleComponent);

    const inputField = component.nativeElement.querySelector('.mat-disabled');
    expect(inputField).toBeTruthy();
  });

});
