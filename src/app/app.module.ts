import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routes'
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

import { App }  from './app';
import { Core }  from './core/core';
import { Home }  from './home/home';
import { Dashboard }  from './dashboard/dashboard';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { StoryService } from './core/story/story.service';

@NgModule({
  imports: [ BrowserModule, routing, HttpModule],       // module dependencies
  declarations: [ App, Core, Home, Dashboard, Header, Footer],   // components and directives
  bootstrap: [ App ],     // root component
  providers: [StoryService, {provide: LocationStrategy, useClass: HashLocationStrategy}]   // services
})
export class AppModule { }