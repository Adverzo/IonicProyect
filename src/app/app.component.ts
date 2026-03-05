import { Component, inject } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  loaded = false;
  private platform = inject(Platform);

  constructor() {
    this.initializeApp();
  }

  initializeApp() {
    // simulate brief delay for splash
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.loaded = true;
      }, 2000);
    });
  }
}
