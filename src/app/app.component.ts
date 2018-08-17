
import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'ams-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  logo = ('../assets/logo.png');
  year = new Date().getFullYear();
  navigation = [
    { link: 'about', label: 'About' },
    { link: 'features', label: 'Features' },
    { link: '/app-github', label: 'App Search Github' }
  ];
  theme = 'nature-theme';
  themes = [
    { value: 'default-theme', label: 'Blue' },
    { value: 'light-theme', label: 'Light' },
    { value: 'nature-theme', label: 'Nature' },
    { value: 'black-theme', label: 'Dark' }
  ];

  constructor(
    public overlayContainer: OverlayContainer
  ) { }

  ngOnInit() {
    this.onThemeChange(this.theme);
  }

  onThemeChange(theme: string) {
    this.theme = theme;
    this.componentCssClass = theme;
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(theme);
  }

}
