import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshosParesComponent } from './slideshos-pares/slideshos-pares.component';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  declarations: [SlideshowBackdropComponent, SlideshowPosterComponent, SlideshosParesComponent, DetalleComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ],
  exports:[
    SlideshowBackdropComponent,
    SlideshowPosterComponent,
    SlideshosParesComponent,
    DetalleComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
