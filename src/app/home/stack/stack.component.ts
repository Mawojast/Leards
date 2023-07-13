import { Component, Input } from '@angular/core';
import { Stack } from '../../interfaces/stack';

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
})
export class StackComponent{

  @Input() stack?: Stack;
  constructor() { }

}
