import {Component} from '@angular/core';
import { Story } from '../story/story.model';
import { StoryService } from '../story/story.service';

@Component({
  selector: '[home]',
  host: {
    class: 'home-page'
  },
  template: require('./home.html')
})
export class Home {
	names:string[] = ["one", "two", "three"];
	stories: Story[];
	constructor(private storyService: StoryService) {
	}
	ngOnInit() {
		// Load stories
		this.loadStories()
	}

	loadStories() {
		// Get all stories
		this.storyService.getStories()
		.subscribe(
			stories => this.stories = stories, //Bind to view
			err => {
				// Log errors if any
				console.log(err);
			}
		);
	}

}
