import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

/*
* handles common layout for title label and a text
* all the inputs are optional and the component will display whichever property is provided
* */

@Component({
  selector: 'app-common-layout',
  templateUrl: './common-layout.component.html',
  styleUrls: ['./common-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })), // Initial state when the element is not present in the DOM
      transition(':leave, :enter', [
        animate('0.5s ease-in-out')
      ])
    ])
  ]
})
export class CommonLayoutComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() label: string;

}
