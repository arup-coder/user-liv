import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as configurationStore from '@nxl/configuration-lib';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'lib-navigation-side-nav',
  templateUrl: './navigation-side-nav.component.html',
  styleUrls: ['./navigation-side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  @Input() ScreenWidthClass = 'expand';
  platformSettings: any;
  logoBanner: any;
  constructor(private fromConfigurationStore: Store<configurationStore.ConfigurationState>) {
    this.fromConfigurationStore.pipe(select(configurationStore.getSelectedPlatformSettings))
      .pipe(tap(settings => this.platformSettings = settings))
      .subscribe();
  }

  ngOnInit() {
  }


  // sidenav show/hide
  clickSideNav(event: Event) {
    this.ScreenWidthClass = this.ScreenWidthClass === 'expand' ? 'collapsed' : 'expand';
  }


}
