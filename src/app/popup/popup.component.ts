import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  [key: string]: any;

  @Input() title: string = "Test";
  @Input() open: boolean = false;
}
