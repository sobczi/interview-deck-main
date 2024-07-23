import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DeckService {
  constructor(private httpClient: HttpClient) {}

  load(): void {
    this.httpClient.get('');
  }
}
