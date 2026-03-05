import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  loaded = false;

  constructor(private platform: Platform) {
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
