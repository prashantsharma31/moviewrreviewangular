import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-nave-bar',
  templateUrl: './side-nave-bar.component.html',
  styleUrls: ['./side-nave-bar.component.scss']
})
export class SideNaveBarComponent implements OnInit {
  @Input() opened = false;
  constructor() { }

  ngOnInit(): void {
  }

}
