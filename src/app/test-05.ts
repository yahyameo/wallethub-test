/**
 * Fix the following issues in the component :
 * * ExpressionChangedAfterItHasBeenCheckedError
 * * Spot the memory leak
 * 
 */
import { Component, NgModule, Injectable, Input, OnInit  } from '@angular/core';
import { RouterModule, Router} from "@angular/router";
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs';


@Injectable()
export class TestService {
    test:BehaviorSubject<string>;

    constructor() {
        this.test  = new BehaviorSubject("angular test #5");
    }

    SetTest(test:string) {
        this.test.next(test);
    }
}

@Component({
    selector : 'ng-app',
    template : `
                <h2>Current test is:</h2>
                {{test}}
                <br/>
                <child [skip-current]="true"></child>
                `,
    styles : []
})
export class MainComponent {
    test:string = null;
    private unsubscribe$ = new Subject<void>();

    constructor(private _srv: TestService) { }
  
    ngOnInit() {
      this._srv.test.pipe(takeUntil(this.unsubscribe$)).subscribe(test => {
        this.test = test;
      });
    }
  
    ngOnDestroy() {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
}

@Component({
    selector : 'child',
    template : `Sample Child component<br/> <button (click)="Next()">next test</button>`
    
})
export class TextChildComponent implements OnInit {
    
    @Input('skip-current') skip = false;

    constructor(private _srv:TestService, private _router:Router) {

    }

    Next() {
        this._router.navigate(["test-six"]);
    }
    ngOnInit() {
        if (this.skip) {
            setTimeout(() => {
                this._srv.SetTest("angular test #6");
            }, 0);
        }
    }

}

@NgModule({
    imports : [
        CommonModule,
        RouterModule.forChild([
            {
                path : "",
                component : MainComponent
            }
        ])
    ],
    declarations : [MainComponent,TextChildComponent],
    providers : [TestService]
})
export class MainModule {};