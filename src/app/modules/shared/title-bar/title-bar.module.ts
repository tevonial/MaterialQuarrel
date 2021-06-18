import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DirectivesModule} from '../directives.module';
import {TitleBarComponent} from './title-bar.component';
import {MaterialImporter} from '../../../material-importer';

@NgModule({
  imports: [
    CommonModule,
    MaterialImporter,
    DirectivesModule
  ],
  declarations: [
    TitleBarComponent
  ],
  exports: [
    TitleBarComponent
  ]
})
export class TitleBarModule {

}
