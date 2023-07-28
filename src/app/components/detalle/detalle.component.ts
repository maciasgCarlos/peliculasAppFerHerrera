import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id: number = 0;
  pelicula!: PeliculaDetalle;
  oculto: number = 150;
  actores: Cast[] = [];
  estrella: string = 'star-outline';
  constructor(private moviesService: MoviesService, private modalCtrl: ModalController, private dataLocalService: DataLocalService) { }

  async ngOnInit() {

    const existe = await this.dataLocalService.existePelicula(this.id).then(existe => this.estrella = (existe) ? 'star' : 'star-outline');
    console.log(existe);

    this.moviesService.getPeliculaDetalle(this.id).subscribe(resp => {
      console.log(resp);
      this.pelicula = resp
    })

    this.moviesService.getActoresPelicula(this.id).subscribe(resp => {
      console.log(resp);
      this.actores = resp.cast;
    })
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  favorito() {
    const existe = this.dataLocalService.guardarPelicula(this.pelicula);
    this.estrella = (existe) ? 'star' : 'star-outline';
  }

}
