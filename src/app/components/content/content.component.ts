import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Photos} from '../../models/Photo';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input() photos: Photos;
  @Output() selectedPhoto: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onSelectPhoto(id: number) {
    this.selectedPhoto.emit(id);
  }
}
