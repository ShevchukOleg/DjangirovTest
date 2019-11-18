import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  public viewState = {
    filter1: 'movies',
    view1: 'card',
    filter2: 'movies',
    view2: 'list'
  };

  constructor() { }

  ngOnInit() {
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
