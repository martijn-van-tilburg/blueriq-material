import { Component, Input } from '@angular/core';
import { Field, FieldMessages } from '@blueriq/core';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent {

  @Input() field: Field; // can be BaseElement?

  hasMessages(): boolean {
    return this.field.messages.hasMessages;
  }

  getMessages(): FieldMessages {
    return this.field.messages;
  }
}