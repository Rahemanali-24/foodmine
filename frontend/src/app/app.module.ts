import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './feature/partials/header/header.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './feature/pages/home/home.component';
import { RatingModule } from 'ng-starrating';
import { SearchComponent } from './feature/partials/search/search.component';
import { TagsComponent } from './feature/partials/tags/tags.component';
import { FoodPageComponent } from './feature/pages/food-page/food-page.component';
import { CartPageComponent } from './feature/pages/cart-page/cart-page.component';
import { TitleComponent } from './feature/partials/title/title.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
