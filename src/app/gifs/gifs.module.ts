import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home-page.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CardListComponent } from './components/card-list/card-list.component';



@NgModule({
  declarations: [
    HomeComponent,
    SearchBoxComponent,
    CardListComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class GifsModule { }
