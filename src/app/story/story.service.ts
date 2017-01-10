import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Story } from './story.model';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StoryService {
	storyScript: any;
    // Resolve HTTP using the constructor
    constructor (private http: Http) {
		this.storyScript=[{
			"boy_1":"Hello World_1",
			"girl_1":"Hello World_2"
		},{
			"boy_1":"Hello World_3"
		}
		]
    }

	getStories() : Observable<Story[]> {
	// ...using get request
	return this.http.get('/stories')
		// ...and calling .json() on the response to return data
		.map((res:Response) => res.json())
		//...errors if any
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	getStory(storyid) : Observable<Story[]> {
	// ...using get request
	return this.http.get("/story/"+storyid)
		// ...and calling .json() on the response to return data
		.map((res:Response) => res.json())
		//...errors if any
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	publishStory(story) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let options = new RequestOptions({ headers: headers });
		let body = JSON.stringify(story);
		return this.http.post('/stories', body, options).map((res: Response) => res.json());
	}
	ngOnInit(){
		//console.log(this.params)
	}
}