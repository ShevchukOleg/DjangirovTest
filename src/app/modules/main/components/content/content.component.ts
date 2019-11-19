import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Film } from '../../interfaces/filmsInterface';
import { ContentService } from '../../services/content.service';


declare const $: any;

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, AfterViewInit {


  public viewState = {
    filter1: 'movies',
    view1: 'card',
    filter2: 'movies',
    view2: 'list'
  };

  public owlParams = {
    items: 3,
    margin: 126,
    stagePadding: 150,
    loop: true,
    rewind: true,
    center: true,
    nav: true,
    navText: ['&larr;', '&rarr;'],
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
  }

  public allFilms: Film[] = [];

  constructor(
    public contenDatatService: ContentService
  ) { }

  ngOnInit() {
    this.contenDatatService.getfilmsInfo();
    this.contenDatatService.allFilmsObservableSubject.subscribe(
      (data: Film[]) => {
        this.allFilms = data.slice();
        console.log('Data get in component class:', this.allFilms, Date.now());
      },
      (error) => console.log(error)
    );
  }

  ngAfterViewInit(): void {
    $(document).ready(
      () => $('.slide-one').owlCarousel(this.owlParams)
    );

    console.log(Date.now());

    $(document).ready(
      () => $('.slide-two').owlCarousel(this.owlParams)
    );
  }

  public changeViewState(section: string, state: string): void {
    if ( section === 'comingSoon' ) {
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
    } else if ( section === 'mostPopular' ) {
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
}
