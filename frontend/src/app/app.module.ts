import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './feature/partials/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './feature/pages/home/home.component';
import { RatingModule } from 'ng-starrating';
import { SearchComponent } from './feature/partials/search/search.component';
import { TagsComponent } from './feature/partials/tags/tags.component';
import { FoodPageComponent } from './feature/pages/food-page/food-page.component';
import { CartPageComponent } from './feature/pages/cart-page/cart-page.component';
import { TitleComponent } from './feature/partials/title/title.component';
import { NotFoundComponent } from './feature/partials/not-found/not-found.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginPageComponent } from './feature/pages/login-page/login-page.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    RatingModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    ToastrModule.forRoot({
      timeOut:3000,
      positionClass:'toast-bottom-right',
      newestOnTop:false
    }),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
