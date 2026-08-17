import { Component, inject } from '@angular/core';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [], // Quitamos componentes fantasmas ya que el flujo es nativo
  templateUrl: './search-page.html',
})
export default class SearchPage {
  // Inyectamos el servicio con el nombre exacto de Moisés
  gifService = inject(GifService);

  onSearch(query: string) {
    if (query.trim().length === 0) return;
    this.gifService.searchGifs(query);
  }

  // Getter para pintar los resultados en el HTML
  get gifs() {
    return this.gifService.trendingGifs();
  }
}
