import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OkService} from './services/ok.service';
import {Photos} from './models/Photo';
import {User} from './models/User';
import {Token} from './models/Token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'api';

  photos: Photos;
  selectPhotoId: number;
  user: User = null;
  albums;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private okService: OkService) { }

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.onAuth();
    } else {
      this.okService.token.access_token = localStorage.getItem('token');
      this.onInit();
    }
  }

  onInit() {
    this.onGetPhoto();
    this.onGetUserInfo();
    this.onGetAlbum();
    this.selectPhotoId = null;
  }

  onAuth() {
    this.route.queryParams.subscribe((param) => {
      if (param.code && !this.okService.code) {
        this.okService.code = param.code;
        this.okService.getToken().subscribe((token: Token) => {
          localStorage.setItem('token', token.access_token);
          this.onInit();
        });
      }
    });
  }

  onExit() {
    this.user = null;
    localStorage.removeItem('token');
    if (this.okService.token) {
      this.okService.token.access_token = localStorage.getItem('token');
      this.okService.token.expires_in = '';
    }
    this.okService.code = '';
    this.selectPhotoId = null;
  }

  onGetUserInfo() {
    this.okService.getUserInfo().subscribe(( (user: User) => this.user = user));
  }

  onGetAlbum() {
    this.okService.getUserAlbums().subscribe(( (albums) => this.albums = albums));
  }

  onGetPhoto() {
    this.okService.getUserPhoto().subscribe((photos: Photos) => this.photos = photos);
  }

  onLikePhoto(id: number) {
    this.okService.likePhoto(id).subscribe(() => {
      alert('Like!');
      this.onGetPhoto();
    });
  }

  onCreateAlbum(title: string) {
    this.okService.createAlbum(title).subscribe(() => {
      alert('Альбом создан!');
      this.onGetAlbum();
    });
  }

  onDelete(id: number) {
    this.okService.deletePhoto(id).subscribe(() => {
      alert('Фото удалено!');
      this.onGetPhoto();
      this.selectPhotoId = null;
    });
  }

  onEditPhoto(id: number, description: string) {
    this.okService.editPhoto(id, description)
      .subscribe(() => {
        alert('Фото изменено!');
        this.onGetPhoto();
        this.selectPhotoId = null;
      });
  }

  onSelectPhoto(id: number) {
    this.selectPhotoId = id;
  }
}
