import { LeftNavComponent } from './shared/left-nav/left-nav.component';
import { HeaderComponent } from './shared/header/header.component';
import { TodoModule } from './todo/todo.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchModule } from './shared/search/search.module';


@NgModule({
  declarations: [
    LeftNavComponent,
    HeaderComponent,
    AppComponent
  ],
  imports: [
    SearchModule,
    TodoModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
