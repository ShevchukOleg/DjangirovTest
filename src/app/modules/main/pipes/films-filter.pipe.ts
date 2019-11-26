import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '../interfaces/filmsInterface';

@Pipe({
  name: 'filmsFilter'
})
export class FilmsFilterPipe implements PipeTransform {

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
