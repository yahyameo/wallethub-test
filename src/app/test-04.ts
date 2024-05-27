/**
 * Add 2 input forms in the following component for first name and last name. Once both forms are filled out by the user, and user has clicked out of the fields, then beside it a username should be automatically generated which should be in the following format: [firstname]_[lastname]_[random integer]
 * First name and last name should be lowercased, and then a random integer between 1 and 9 should be added to the end
 * For example: if the inputs are "John" and "DOE" the generated username could be "john_doe_4" or "john_doe_2"
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `
             <h2>Enter your first and last name</h2>
        <div>
            <input type="text" [(ngModel)]="first_name" (blur)="createUsername()" placeholder="First Name" />
            <input type="text" [(ngModel)]="last_name" (blur)="createUsername()" placeholder="Last Name" />
        </div>
        <div *ngIf="username">
            <p>Username: {{username}}</p>
        </div>
                `,
    styles : []
})
export class UserNameComponent {
    first_name: string = "";
    last_name: string = "";
    username: string | null = null;

    createUsername() {
        if (this.first_name && this.last_name) {
            const randomInt = Math.floor(Math.random() * 9) + 1;
            this.username = `${this.first_name.toLowerCase()}_${this.last_name.toLowerCase()}_${randomInt}`;
        }
    }

}

@NgModule({
    imports : [
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : UserNameComponent
            }
        ])
    ],
    declarations : [UserNameComponent]
})
export class UserNameModule {};