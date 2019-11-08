import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Token} from '../models/Token';
import {md5} from '../md5/md5';
import {User} from '../models/User';
import {map} from 'rxjs/operators';

const baseApi = 'http://api.odnoklassniki.ru/';
const apiServer = 'https://api.ok.ru/';
const applicationId = '512000154018';
const applicationPublicKey = 'CDKKFHJGDIHBABABA';
const applicationSecretKey = '5E015FA33F4BA013AAAFD182';
const redirectURL = 'http://localhost:4200/';
const format = 'json';

@Injectable({
  providedIn: 'root'
})
export class OkService {

  token: Token = new Token();
  user: User;
  code = '';

  constructor(private http: HttpClient) { }

  getToken() {
    const grantType = 'authorization_code';
    return this.http.post(
      `${baseApi}oauth/token.do?code=${this.code}&client_id=${applicationId}&client_secret=${applicationSecretKey}&redirect_uri=${redirectURL}&grant_type=${grantType}`,
      {}
      ).pipe(map((token: Token) => this.token = token));
  }

  getSigInfo(method: string): string {
    const sessionSecretKey = md5(this.token.access_token + applicationSecretKey);
    const sig = md5(`application_key=${applicationPublicKey}format=${format}method=${method}` + sessionSecretKey);
    return sig;
  }

  getUserInfo() {
    const method = 'users.getCurrentUser';
    const sig = this.getSigInfo(method);
    return this.http.get(
      `${apiServer}fb.do?method=${method}&application_key=${applicationPublicKey}&format=${format}&sig=${sig}&access_token=${this.token.access_token}`
    );
  }

  getUserPhoto() {
    const method = 'photos.getPhotos';
    const sig = this.getSigInfo(method);
    return this.http.get(
      `${baseApi}fb.do?application_key=${applicationPublicKey}&format=${format}&method=${method}&sig=${sig}&access_token=${this.token.access_token}`
    );
  }

  getUserAlbums() {
    const method = 'photos.getAlbums';
    const sig = this.getSigInfo(method);
    return this.http.get(
      `${baseApi}fb.do?application_key=${applicationPublicKey}&format=${format}&method=${method}&sig=${sig}&access_token=${this.token.access_token}`
    );
  }

  deletePhoto(id: number) {
    const method = 'photos.deletePhoto';
    const sessionSecretKey = md5(this.token.access_token + applicationSecretKey);
    const sig = md5(`application_key=${applicationPublicKey}format=${format}method=${method}photo_id=${id}` + sessionSecretKey);
    return this.http.get(
      `${baseApi}fb.do?application_key=${applicationPublicKey}&format=${format}&method=${method}&photo_id=${id}&sig=${sig}&access_token=${this.token.access_token}`
    );
  }

  editPhoto(id: number, description: string) {
    const method = 'photos.editPhoto';
    const sessionSecretKey = md5(this.token.access_token + applicationSecretKey);
    const sig = md5(`application_key=${applicationPublicKey}description=${description}format=${format}method=${method}photo_id=${id}` + sessionSecretKey);
    return this.http.get(
      `${baseApi}fb.do?application_key=${applicationPublicKey}&format=${format}&method=${method}&photo_id=${id}&description=${description}&sig=${sig}&access_token=${this.token.access_token}`
    );
  }

  likePhoto(id: number) {
    const method = 'photos.addPhotoLike';
    const sessionSecretKey = md5(this.token.access_token + applicationSecretKey);
    const sig = md5(`application_key=${applicationPublicKey}format=${format}method=${method}photo_id=${id}` + sessionSecretKey);
    return this.http.get(
      `${baseApi}fb.do?application_key=${applicationPublicKey}&format=${format}&method=${method}&photo_id=${id}&sig=${sig}&access_token=${this.token.access_token}`
    );
  }

  createAlbum(title: string) {
    const method = 'photos.createAlbum';
    const type = 'SHARED';
    const sessionSecretKey = md5(this.token.access_token + applicationSecretKey);
    const sig = md5(`application_key=${applicationPublicKey}format=${format}method=${method}title=${title}type=${type}` + sessionSecretKey);
    return this.http.get(
      `${baseApi}fb.do?application_key=${applicationPublicKey}&format=${format}&method=${method}&title=${title}&type=${type}&sig=${sig}&access_token=${this.token.access_token}`
    );
  }
}
