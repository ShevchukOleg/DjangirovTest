import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SwiperModule, SWIPER_CONFIG, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FilmsFilterPipe } from './pipes/films-filter.pipe';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'vertical',
  loop: true,
  slidesPerView: 3,
  threshold: 20,
  spaceBetween: 10
};



@NgModule({
  declarations: [HeaderComponent, FooterComponent, ContentComponent, FilmsFilterPipe],
  imports: [
    CommonModule,
    CarouselModule,
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  exports: [ HeaderComponent, FooterComponent, ContentComponent]
})
export class MainModule { }
