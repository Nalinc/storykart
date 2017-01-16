import { NgModule }      from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routes'
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

import { App }  from './app';
import { Home }  from './home/home';
import { Story }  from './story/story.component';
import { Dashboard }  from './dashboard/dashboard';
import { KeysPipe } from './global/keysTransform.pipe';
import { ScriptBuilder }  from './scriptbuilder/scriptbuilder.component';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { StoryService } from './story/story.service';
import { MakeDroppable } from './dashboard/makeDroppable.directive';
import { MakeDraggable } from './dashboard/makeDraggable.directive';
import { DragulaModule } from 'ng2-dragula';


@NgModule({
	imports: [ BrowserModule, routing, HttpModule, DragulaModule],       // module dependencies
	declarations: [ 
		App,
		Home, 
		Story, 
		Dashboard, 
		ScriptBuilder, 
		Header, 
		Footer, 
		MakeDraggable,
		MakeDroppable, 
		KeysPipe],   // components and directives
	bootstrap: [ App ],     // root component
	providers: [StoryService, {provide: LocationStrategy, useClass: HashLocationStrategy}]   // services
})
export class AppModule { }