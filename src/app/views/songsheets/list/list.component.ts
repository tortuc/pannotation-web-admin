import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

const minSearchLength = 3;

@Component({
    selector: 'app-songsheets-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SongsheetsListComponent {

    public q = this.activatedRoute.snapshot.queryParams.q;
    public eventsSubject: Subject<string> = new Subject<string>();
    
    searchControl = new FormControl(this.q);

    constructor(private readonly activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.searchControl.valueChanges
        .pipe(
            distinctUntilChanged(),
            debounceTime(300)
        )
        .subscribe((val) => {
            if (val.length === 0 || val.length >= minSearchLength) {
                this.eventsSubject.next(val);
                return;
            }
            
            let q = this.activatedRoute.snapshot.queryParams.q;
            if(q && q.length >= minSearchLength && val.length < minSearchLength)
            {
                this.eventsSubject.next("");
            }
        });
    }
}
