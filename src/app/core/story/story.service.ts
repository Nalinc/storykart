import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Story } from './story.model';
import { Observable } from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class StoryService {
     // Resolve HTTP using the constructor
     constructor (private http: Http) {}
     // private instance variable to hold base url
     private storiesUrl = 'http://localhost:8080/stories'; 


	getStories() : Observable<Story[]> {
	// ...using get request
	return this.http.get(this.storiesUrl)
		// ...and calling .json() on the response to return data
		.map((res:Response) => res.json())
		//...errors if any
		.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}
}