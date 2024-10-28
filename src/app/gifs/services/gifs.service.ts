import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Array<Gif> = [];
  private _tagsHistory: Array<string> = [];
  private apiKey: string = '';
  private serviceUrl = 'https://api.giphy.com/v1/gifs';
  constructor(private httpClient: HttpClient) {
    this.loadLocalStorage();
  }
  get tagsHistory(): Array<string> {
    return [...this._tagsHistory];
  }
  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }
  private saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }
  private loadLocalStorage() {
    const history = localStorage.getItem('history');
    if (!history) return;

    this._tagsHistory = JSON.parse(history);
    if(this.tagsHistory.length === 0) return;
    this.searchTag(this.tagsHistory[0]); // Load first tag from history on app start.  This is to ensure the user always has a search history when the app is loaded.  Without this, the user might not be able to see their history.  This is a workaround and should be removed when the app is fully functional.  The history should be loaded on the user's first search and then saved to local storage.  The search should then be triggered from the local 
  }
  searchTag(tag: string) {
    if (tag.length == 0) return;
    

    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('q', tag)
      .set('limit', 10)
      .set('api_key', this.apiKey);
    this.httpClient
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((res) => {
        this.gifList = res.data;
      });
  }
}
