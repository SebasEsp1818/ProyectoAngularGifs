import { Component } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifListItem } from "../../components/gif-list/gif-list-item/gif-list-item";

@Component({
  selector: 'app-trending-page',
  imports: [GifList, GifListItem],
  templateUrl: './trending-page.html',
})
export default class TrendingPage {}
