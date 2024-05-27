/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input, NgModule, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
    selector: 'ng-app',
    template: `<div>
                    <h2>Loan Details</h2>
                    <b>Monthly Payment:</b> {{formattedPayment(monthly_payment)}} <br/>
                    <b>Late Payment Fee : {{formattedPayment(late_payment)}}</b> <br/>
                </div>`
})
export class Test01Component {

    @Input() loan_amount: number = 1000;

    get monthly_payment(): number {
        return this.loan_amount * 0.02;
    }

    get late_payment(): number {
        return (this.monthly_payment as number) * 0.05;
    }

    formattedPayment(amount: number): string {
        return isNaN(amount) ? 'N/A' : this.formatCurrency(amount);
    }
    private formatCurrency(value: number): string {
        return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    }

}

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: "",
                component: Test01Component
            }
        ])
    ],
    declarations: [Test01Component]
})
export class Test01Module { }