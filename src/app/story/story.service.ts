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
	scriptTransitionIndex: any;
	scriptTransitionRelativeIndex: any;
    // Resolve HTTP using the constructor
    constructor (private http: Http) {
		/*this.storyScript=[{
			"boy_1":"Hello World_1",
			"girl_1":"Hello World_2"
		},{
			"boy_1":"Hello World_3"
		}
		]*/
		this.storyScript=[
			[
				{"actor":"boy_1","speech":"Hello World_11"},
				{"actor":"girl_1","speech":"Hello World_22"}
			],
			[
				{"actor":"boy_1","speech":"Hello World_33"}
			]
		];		
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

	updateDialogue = function(i, j, dialogue){
		console.log("updateDialogue= "+i+", "+j);
		var newI;
		if(this.scriptTransitionIndex){
			i = this.scriptTransitionIndex;
			this.scriptTransitionIndex=undefined;
		}
		if(this.scriptTransitionRelativeIndex){
			j = this.scriptTransitionRelativeIndex;
			this.scriptTransitionRelativeIndex=undefined;
		}
		console.log(this.storyScript)
		this.storyScript[i][j]["speech"] = dialogue;
	}
	deleteDialogue = function(i, j){
		if(this.storyScript[i].length>1){
			this.storyScript[i].splice(j,1)
		}
		else{
			this.storyScript.splice(i,1)
		}
	}
	addDialogue = function(mode){
		if(mode=="horizontal"){
			console.log(this.storyScript)
			var lastIndex,lastText;
			this.storyScript[this.storyScript.length-1].forEach(function(e,i){
				if(e.actor=="boy_1"){
					lastIndex=i;
					lastText =e.speech;
				}
			})
			if(!isNaN(lastIndex)){
				this.storyScript[this.storyScript.length-1].splice(lastIndex,1);
				this.storyScript[this.storyScript.length-1].push({"actor":"boy_1","speech":lastText+"\nHi"})
			}else{
				this.storyScript[this.storyScript.length-1].push({"actor":"boy_1","speech":"Hi"})
			}
		}
		else if(mode=="vertical"){
			this.storyScript.push([{"actor":"boy_1","speech":"Hi"}]);
		}
	}

	ngOnInit(){
		//console.log(this.params)
	}
}