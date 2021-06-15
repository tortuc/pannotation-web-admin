import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent {
  @Input() isActive: boolean = false;
  @Input() onChange: (event: any) => void;


  constructor() { }
}
