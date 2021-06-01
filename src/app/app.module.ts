import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImporter } from './material-importer';
import { AppRoutingModule } from './app-routing.module';

import { SettingsComponent } from './settings/settings.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { ReplySheetComponent } from './modules/thread/reply-sheet/reply-sheet.component';
import { PostsComponent } from './posts/posts.component';
import { AccountComponent } from './modules/account/account.component';
import {AuthInterceptor} from './auth-interceptor';
import { EditSheetComponent } from './modules/thread/edit-sheet/edit-sheet.component';
import {DirectivesModule} from './modules/directives/directives.module';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ReplySheetComponent,
    PostsComponent,
    AccountComponent,
    EditSheetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialImporter,
    ReactiveFormsModule,
    AppRoutingModule,
    MatBottomSheetModule,
    DirectivesModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
