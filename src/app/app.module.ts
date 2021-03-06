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
import {AuthInterceptor} from './auth-interceptor';
import { EditSheetComponent } from './modules/thread/edit-sheet/edit-sheet.component';
import {ConfirmDialogModule} from './modules/shared/confirm-dialog/confirm-dialog.module';
import {TitleBarModule} from './modules/shared/title-bar/title-bar.module';
import {ToasterContainerComponent} from './toaster/toaster-container.component';
import {ToasterComponent} from './toaster/toaster.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    ReplySheetComponent,
    PostsComponent,
    EditSheetComponent,
    ToasterContainerComponent,
    ToasterComponent
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
    ConfirmDialogModule.forRoot(),
    TitleBarModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
