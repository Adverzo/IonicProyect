import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  private router = inject(Router);
  private toastController = inject(ToastController);

  constructor() {}

  async onLogin() {
    if (!this.email || !this.password) {
      const toast = await this.toastController.create({
        message: 'Por favor, completa todos los campos.',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
      return;
    }
    // Simular login exitoso
    const toast = await this.toastController.create({
      message: 'Login exitoso. Redirigiendo...',
      duration: 1500,
      color: 'success',
      position: 'top'
    });
    toast.present();
    setTimeout(() => {
      this.router.navigate(['/registro']);
    }, 1500);
  }
}