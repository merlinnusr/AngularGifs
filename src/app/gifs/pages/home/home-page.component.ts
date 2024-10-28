import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',
})
export class HomeComponent {
  constructor(
    private gifsService: GifsService,
  ){

  }
  get gifs(){
    return this.gifsService.gifList;
  }
}
