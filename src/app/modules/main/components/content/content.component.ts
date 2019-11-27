import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs';
import { Film } from '../../interfaces/filmsInterface';
import { ContentService } from '../../services/content.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {
  SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface
} from 'ngx-swiper-wrapper';



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})

export class ContentComponent implements OnInit, OnDestroy {
  /**
   * перелік підписок компоненти
   */
  subscriptions: Subscription[] = [];

  /** viewState - об'єкт управління фільтрації та типів відображення слайдерів
   */
  public viewState = {
    filter1: 'movies',
    view1: 'card',
    filter2: 'movies',
    view2: 'list'
  };

  /**
   * swiperConfig - об'єкт параметрві горизонтального слайдеру
   */
  public swiperConfig: SwiperConfigInterface = {
    loop: true,
    direction: 'vertical',
    spaceBetween: 50,
    speed: 800,
    effect: 'slide',
    slidesPerView: 3,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: false
  };

  /**
   * swiperConfig - об'єкт параметрві вертикального слайдеру
   */
  public owlParams: OwlOptions = {
    items: 2,
    margin: 126,
    stagePadding: 250,
    loop: true,
    rewind: false,
    center: true,
    nav: false,
    navText: ['&larr;', '&rarr;'],
    dots: false,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    autoplaySpeed: 1200,
    smartSpeed: 750,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1024: {
        items: 3
      }
    }
  };

  /**
   * локальне сховище данних про всі об'єкти для відображення в шаблоні
   */
  public allFilms: Film[] = [];

  constructor(
    public contenDatatService: ContentService
  ) { }


  /**
   * на єтапі ініціалізації компоненти звертаємось до сервісу із запитом на надання
   * передіку об'єктів на відображення; підписуємось на спостерігач із сервісу,
   * при надходжені зберігаєм данні до this.allFilms
   */
  ngOnInit() {
    this.contenDatatService.getfilmsInfo();
    this.subscriptions.push(
      this.contenDatatService.allFilmsObservableSubject.subscribe(
        (data: Film[]) => {
          this.allFilms = data.slice();
          console.log('Data get in component class:', this.allFilms, Date.now());
        },
        (error) => console.log(error)
      )
    );
  }

  ngOnDestroy(): void {
    /**
     * відписка від спостерігачів сервісу
     */
    this.subscriptions.forEach(
        (subscription) => {
          subscription.unsubscribe();
          subscription = null;
        }
      );
    this.subscriptions = [];
  }

  /**
   * changeViewState - метод управління станами відображення та сортування данних слайдерів
   * @param section - розділ зі слайдером
   * @param state - порядо сортування
   */
  public changeViewState(section: string, state: string): void {
    if (section === 'comingSoon') {
      switch (state) {
        case
          'all': this.viewState.filter1 = 'all';
          break;
        case
          'movies': this.viewState.filter1 = 'movies';
          break;
        case
          'tv': this.viewState.filter1 = 'tv';
          break;
        case
          'card': this.viewState.view1 = 'card';
          break;
        case
          'list': this.viewState.view1 = 'list';
          break;
        default: {
          this.viewState.filter1 = 'movies';
          this.viewState.view1 = 'card';
        };
      }
    } else if (section === 'mostPopular') {
      switch (state) {
        case
          'all': this.viewState.filter2 = 'all';
          break;
        case
          'movies': this.viewState.filter2 = 'movies';
          break;
        case
          'tv': this.viewState.filter2 = 'tv';
          break;
        case
          'card': this.viewState.view2 = 'card';
          break;
        case
          'list': this.viewState.view2 = 'list';
          break;
        default: {
          this.viewState.filter1 = 'movies';
          this.viewState.view1 = 'list';
        };
      }
    }
    console.log(this.viewState);
  }
  /**
   * группа гетерів для передачі данних до шаблону
   */
  get filter1Order() {
    return this.viewState.filter1;
  }

  get filter2Order() {
    return this.viewState.filter2;
  }

  get firstSliderStyle() {
    return this.viewState.view1;
  }

  get secondSliderStyle() {
    return this.viewState.view2;
  }
}
