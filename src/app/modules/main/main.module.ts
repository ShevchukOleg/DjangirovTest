import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentComponent } from './components/content/content.component';
import { CarouselModule } from 'ngx-owl-carousel-o';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, ContentComponent],
  imports: [
    CommonModule,
    CarouselModule
  ],
  exports: [ HeaderComponent, FooterComponent, ContentComponent]
})
export class MainModule { }
