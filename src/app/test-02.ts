/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'textfield',
    template: '<input [(ngModel)]="field" type="text" (ngModelChange)="onValueChange($event)" />'
})
export class TextField {
    @Output() valueChange = new EventEmitter<string>();
    field = "";
    
    onValueChange(value: string) {
        this.field = value;
        this.valueChange.emit(this.field);
    }
}

@Component({
    selector: 'child-component',
    template: `<h2>Title:<h2><br/><textfield (valueChange)="onValueChange($event)"></textfield>`
})
export class ChildComponent {
    @Output() valueChange = new EventEmitter<string>();

    onValueChange(value: string) {
        this.valueChange.emit(value);
    }
}


@Component({
    selector: 'ng-app',
    template: `<div>
                    <child-component (valueChange)="onValueChange($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title: string = "";
    onValueChange(value: string) {
        this.title = value;
    }
}

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {
                path: "",
                component: Test02Component
            }
        ])
    ],
    declarations: [Test02Component, ChildComponent, TextField]
})
export class Test02Module { };