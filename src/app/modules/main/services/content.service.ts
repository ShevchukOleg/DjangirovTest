import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, BehaviorSubject} from 'rxjs';
import { Film } from '../interfaces/filmsInterface';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  /**
   * - information about films
   */
  private dataLocation: string = environment.dataLocation;

  private allFilms: Film[] = [];

  private allFilmsSource = new BehaviorSubject([]);
  public allFilmsObservableSubject: Observable<Film[]> = this.allFilmsSource.asObservable();

  constructor( private http: HttpClient ) { }

  public getfilmsInfo() {

    if (!this.allFilms.length) {
      this.http.get<Film[]>(this.dataLocation).subscribe(
        (response: Film[]) =>  {
          this.allFilms = response.slice();
          console.log('Data in service: ', this.allFilms);
          this.allFilmsSource.next(this.allFilms);
        },
        (error) => console.log(error)
      );
    } else {
      this.allFilmsSource.next(this.allFilms);
    }
  }
}
