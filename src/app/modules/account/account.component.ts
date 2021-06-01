import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, AfterViewInit {
  links = [
    {title: 'Overview', link: 'overview'},
    {title: 'Settings', link: 'settings'},
    {title: 'Security', link: 'security'}
  ];
  activeLink: { title: string; link: string; };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.url.split('/' ).pop())
    ).subscribe(route => {
      this.activeLink = this.links[this.links.findIndex(link => link.link === route)];
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }
}
