import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  description = '';
  @Input() selectPhotoId: number;
  @Input() albums: [];
  @Input() user: User;
  @Input() isSelectPhoto: boolean;
  @Output() likePhoto: EventEmitter<number> = new EventEmitter<number>();
  @Output() createAlbum: EventEmitter<string> = new EventEmitter<string>();
  @Output() deletePhoto: EventEmitter<number> = new EventEmitter<number>();
  @Output() editPhoto: EventEmitter<{id: number, description: string}> = new EventEmitter<{id: number, description: string}>();
  @Output() auth: EventEmitter<any> = new EventEmitter<any>();
  @Output() exit: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onChangeDescription(description: string) {
    this.description = description;
  }

  onAuth() {
    this.auth.emit();
  }

  onExit() {
    this.exit.emit();
  }

  onDelete(id: number) {
    this.deletePhoto.emit(id);
  }

  onEditPhoto(id: number) {
    this.editPhoto.emit({id, description: this.description});
    this.description = '';
  }

  onCreateAlbum(title: string) {
    this.createAlbum.emit(title);
  }
}
