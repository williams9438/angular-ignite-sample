import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationStart, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { routes } from './app-routing.module';

import { IgxNavigationDrawerComponent } from 'igniteui-angular/navigation-drawer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public topNavLinks: Array<{
    path: string,
    name: string
  }> = [];
  @ViewChild(IgxNavigationDrawerComponent) public navdrawer: IgxNavigationDrawerComponent;

  constructor(private router: Router) {
    for (const route of routes) {
      if (route.path && route.data && route.path.indexOf('*') === -1) {
        this.topNavLinks.push({
          name: route.data.text,
          path: '/' + route.path
        });
      }
    }
  }

  public ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
          if (event.url !== '/' && !this.navdrawer.pin) {
              // Close drawer when selecting a view on mobile (unpinned)
              this.navdrawer.close();
          }
      });
  }
}
