import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  constructor(private movieService: MoviesService) { }
  ngOnInit(): void {
    this.movieService.getFeature().subscribe((resp) => {
      this.peliculasRecientes = resp.results;
    });

    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.movieService.getPopulares().subscribe(resp => {
      const arrTemp = [...this.populares, ...resp.results]
      this.populares = arrTemp;
    })
  }


}
