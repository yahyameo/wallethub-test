/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `<form (submit)="validateForm($event)">
    <h2>Login</h2>
    <br/>
    <input type="email" [(ngModel)]="email" name="email" placeholder="Email"/>
    <div *ngIf="emailError" style="color:red">{{emailError}}</div>
    <br/>
    <input type="password" [(ngModel)]="password" name="password" placeholder="Password"/>
    <div *ngIf="passwordError" style="color:red">{{passwordError}}</div>
    <br/>
    <button type="submit">Submit</button>
    <br/><br/>
    <div *ngIf="logged_in">Logged In!</div>
</form>`
})
export class Test03Component {

    email: string = "";
    password: string = "";

    emailError: string | null = null;
    passwordError: string | null = null;
    logged_in = false;

    validateForm(event: Event) {
        event.preventDefault();
        this.emailError = this.emailValidator(this.email) ? null : 'Email must end with @a.com';
        this.passwordError = this.passwordValidator(this.password) ? null : 'Password must contain at least one special character, one uppercase character, one lowercase character, one number, and be at least 8 characters long';

        if (!this.emailError && !this.passwordError) {
            this.logged_in = true;
        } else {
            this.logged_in = false;
        }
    }

    emailValidator(email: string): boolean {
        const emailPattern = /^[^@]+@a\.com$/;
        return emailPattern.test(email);
    }

    passwordValidator(password: string): boolean {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordPattern.test(password);
    }
}

@NgModule({
    imports : [
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};