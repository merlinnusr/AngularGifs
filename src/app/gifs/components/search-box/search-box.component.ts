import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-box',
  template: `
    <h3>Buscar: </h3>
    <input 
      type="text" 
      class="form-control"  
      placeholder="Search for GIFs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
      >
  `,
})
export class SearchBoxComponent {
  constructor(
    private gifsService: GifsService
  ){

  }
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;
  searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';  // Reset input field after search
    console.log({newTag});
  }
}
