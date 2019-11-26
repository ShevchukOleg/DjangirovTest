import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../interfaces/filmsInterface';

@Pipe({
  name: 'filmsFilter'
})
export class FilmsFilterPipe implements PipeTransform {
  /**
   * @param value - перелік об'єктів з інтерфейсом Film для фільтрації
   * @param order - параметр фільтрації
   */
  transform(value: Film[], order: string): Film[] {
    switch (order) {
      case 'all':
        return value;
      case 'movies':
        return value.slice().filter( (film: Film) => film.type === 'Movie');
      case 'tv':
        return value.slice().filter( (film: Film) => film.type === 'TV-Show');
    }
  }
}
