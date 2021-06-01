import { Component, OnInit } from '@angular/core';
import {SettingsService} from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  loading = [false, false];
  forumName = '';
  darkTheme = false;

  constructor(
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.settingsService.getForumName().subscribe((forumName) => {
      this.forumName = forumName;
    });
  }

  saveForumSettings(): void {
    this.loading[0] = true;

    const settings = [{
      key: 'forum-title',
      value: this.forumName
    }];

    this.settingsService.saveConfiguration('forum-config', settings).subscribe((result) => {
      this.loading[0] = false;
    });
  }

  saveDisplaySettings(): void {
    this.loading[1] = true;

    const settings = [{
      key: 'dark-theme',
      value: String(this.darkTheme)
    }];

    this.settingsService.saveConfiguration('display-config', settings).subscribe(() => {
      this.loading[1] = false;
    });
  }

}
