import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToastController } from '@ionic/angular';

interface EcoData {
  transporte: string;
  vecesTransporte: number;
  alimentacion: string;
  carneSemana: number;
  banosDia: number;
  aireAcondicionado: string;
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  data: EcoData = {
    transporte: '',
    vecesTransporte: 0,
    alimentacion: '',
    carneSemana: 0,
    banosDia: 0,
    aireAcondicionado: ''
  };

  private router = inject(Router);
  private toastController = inject(ToastController);

  constructor() {}

  async onSubmit() {
    if (!this.data.transporte || !this.data.alimentacion) {
      const toast = await this.toastController.create({
        message: 'Por favor, selecciona transporte y alimentación.',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
      return;
    }
    let score = 0;
    if (this.data.transporte === 'auto') score += 20;
    else if (this.data.transporte === 'bus') score += 10;
    else if (this.data.transporte === 'bici') score += 2;
    score += this.data.vecesTransporte * 2;
    if (this.data.alimentacion === 'carnivoro') score += 15;
    else if (this.data.alimentacion === 'vegetariano') score += 8;
    else score += 3;
    score += this.data.carneSemana * 1.5;
    score += this.data.banosDia * 3;
    if (this.data.aireAcondicionado === 'si') score += 10;

    const toast = await this.toastController.create({
      message: 'Datos enviados. Calculando resultado...',
      duration: 1500,
      color: 'success',
      position: 'top'
    });
    toast.present();
    setTimeout(() => {
      this.router.navigate(['/resultado'], { state: { score, data: this.data } });
    }, 1500);
  }
}