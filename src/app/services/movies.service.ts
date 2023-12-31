import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre, PeliculaDetalle, RespuestaCredits, ResuestaMDB } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage: number = 0;
  generos: Genre[]=[];

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = URL + query;

    query += `&api_key=${apiKey}&language=es&include_image_language=es`;

    return this.http.get<T>(query);

  }

  getFeature() {

    const hoy = new Date()
    const ultimoDia = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
    const mes = hoy.getMonth() + 1
    let mesString;

    if (mes < 10) {
      mesString = '0' + mes;
    } else {
      mesString = mes
    }

    const inicio = `${hoy.getFullYear()}-${mesString}-01`;
    const fin = `${hoy.getFullYear()}-${mesString}-${ultimoDia}`;

    return this.ejecutarQuery<ResuestaMDB>(`/discover/movie?primary_release_date.gte=${inicio}&primary_release_date.gte=${fin}`);

  }

  getPopulares() {
    this.popularesPage++;
    const query = `/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&page=${this.popularesPage}`;
    return this.ejecutarQuery<ResuestaMDB>(query)
  }

  getPeliculaDetalle(id: number) {
    return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`)
  }

  getActoresPelicula(id: number) {
    return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`)
  }

  buscarPeliculas(texto: string) {
    return this.ejecutarQuery(`/search/movie?query=${texto}`);
  }

  cargarGeneros(): Promise<Genre[]>{

    return new Promise(resolve=>{
      this.ejecutarQuery(`/genre/movie/list?a=1`).subscribe((resp:any)=>{
        this.generos = resp['genres'],
        console.log(this.generos);
        resolve(this.generos);
      })
    })
  }
}

//https://api.themoviedb.org/3/genre/movie/list?api_key=1865f43a0549ca50d341dd9ab8b29f49&language=es&include_image_language=es