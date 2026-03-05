import { Component, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ToastController } from '@ionic/angular';

Chart.register(...registerables);

@Component({
  selector: 'app-resultado',
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
  templateUrl: './resultado.page.html',
  styleUrls: ['./resultado.page.scss'],
})
export class ResultadoPage implements OnInit {
  score: number | null = null;
  consejos: string[] = [];
  @ViewChild('chartCanvas', { static: false }) chartCanvas!: ElementRef;
  private toastController = inject(ToastController);

  ngOnInit() {
    const navigation = history.state;
    if (navigation.score !== undefined) {
      this.score = navigation.score;
      this.generateConsejos();
      this.createChart();
      this.showSuccessToast();
    }
  }

  getLevel(): string {
    if (this.score! < 20) return 'Baja';
    if (this.score! < 40) return 'Media';
    return 'Alta';
  }

  getDescription(): string {
    if (this.score! < 20) return '¡Excelente! Tu huella ecológica es baja. Sigue así.';
    if (this.score! < 40) return 'Buen trabajo, pero hay margen para mejorar.';
    return 'Tu huella ecológica es alta. Considera cambios en tus hábitos.';
  }

  generateConsejos() {
    this.consejos = [];
    if (this.score! > 15) {
      this.consejos.push('Considera usar transporte público o bicicleta en lugar de auto.');
    }
    if (this.score! > 10) {
      this.consejos.push('Reduce el consumo de carne y opta por opciones vegetarianas.');
    }
    if (this.score! > 5) {
      this.consejos.push('Toma duchas más cortas para ahorrar agua.');
    }
    this.consejos.push('Apaga los electrodomésticos cuando no los uses.');
    this.consejos.push('Recicla y reduce el uso de plásticos.');
  }

  createChart() {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const data = this.getChartData();
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Transporte', 'Alimentación', 'Agua', 'Energía'],
        datasets: [{
          data: data,
          backgroundColor: ['#4caf50', '#81c784', '#a5d6a7', '#c8e6c9'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });
  }

  getChartData(): number[] {
    // Calcular porcentajes basados en score
    const transporte = Math.min(this.score! * 0.4, 40);
    const alimentacion = Math.min(this.score! * 0.3, 30);
    const agua = Math.min(this.score! * 0.2, 20);
    const energia = Math.min(this.score! * 0.1, 10);
    return [transporte, alimentacion, agua, energia];
  }

  async showSuccessToast() {
    const toast = await this.toastController.create({
      message: '¡Resultado calculado exitosamente!',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }
}