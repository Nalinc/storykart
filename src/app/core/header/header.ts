import {Component} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    directives: [RouterLink],
    template: require('./header.html')
})

export class Header {
		names:string = "";
}
