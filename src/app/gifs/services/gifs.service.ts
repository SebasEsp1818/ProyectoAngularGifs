import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, GiphyResponse } from '../interfaces/gif.interface';
import { GifMapper } from '../mappper/gif.mapper';

@Injectable({ providedIn: 'root' })
export class GifService { // <-- Cambiado a GifService en singular
  private http = inject(HttpClient);
  private baseUrl: string = 'https://giphy.com';
  private apiKey: string = '9wXp8vVbZ90J4lXg2R1K5N7M3Q6B4T8A'; // Tu llave de Giphy

  trendingGifs = signal<Gif[]>([]);
  trendingGfsLoanding = signal(true);

  constructor() {
    this.loadTrendingGifs();
    console.log('Servicio creado');
  }

  loadTrendingGifs() {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20');

    this.http.get<GiphyResponse>(`${this.baseUrl}/trending`, { params })
      .subscribe( resp => {
        const gifs = GifMapper.fromGiphyResponse(resp);
        this.trendingGifs.set(gifs);
        this.trendingGfsLoanding.set(false);
      });
  }

  // METODO EXACTO DE MOISÉS DEL COMMIT 034d4e4
  searchGifs(query: string) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q', query);

    this.http
      .get<GiphyResponse>(`${this.baseUrl}/search`, { params })
      .subscribe((resp) => {
        const gifs = GifMapper.fromGiphyResponse(resp);
        // Actualizamos la señal para que cambien las imágenes en la pantalla
        this.trendingGifs.set(gifs);
        console.log({ search: gifs });
      });
  }
}
