import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshos-pares',
  templateUrl: './slideshos-pares.component.html',
  styleUrls: ['./slideshos-pares.component.scss'],
})
export class SlideshosParesComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }


  async verDetalle(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    })

    modal.present();
  }
  onClick() {
    this.cargarMas.emit();
  }

}
