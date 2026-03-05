import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  ngOnInit() {
    const navigation = history.state;
    if (navigation.score !== undefined) {
      this.score = navigation.score;
      this.generateConsejos();
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
}