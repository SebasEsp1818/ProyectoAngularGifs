import { Component, inject, signal } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
})
export default class SearchPage {
  
  gifService: GifService = inject(GifService);
  gifs: ReturnType<typeof signal<Gif[]>> = signal<Gif[]>([]);

 onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe((resp: Gif[]): void => {
      this.gifs.set(resp);
    });
  }
}
