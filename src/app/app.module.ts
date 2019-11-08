import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContentComponent } from './components/content/content.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BsDropdownModule, ModalModule, TooltipModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot([
      { path: ' ',   redirectTo: 'ok', pathMatch: 'full' },
      { path: 'ok',  component: AppComponent },
      { path: '**', component: PageNotFoundComponent }
    ]),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
