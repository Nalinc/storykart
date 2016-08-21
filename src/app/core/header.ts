/// <reference path="../../../typings/index.d.ts" />

import {Component} from '@angular/core';

@Component({
    selector: 'my-app',
    template: require('./header.html')
})

export class LayoutComponent {
		names:string = "";
}
