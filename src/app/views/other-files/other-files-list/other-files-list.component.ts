import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OtherFilesDropdownItem } from '../other-files.interface';
import { OtherFilesTypes } from 'src/app/core/enums/other-files-types';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

const minSearchLength = 3;

@Component({
    selector: 'app-other-files-list',
    templateUrl: './other-files-list.component.html',
    styleUrls: ['./other-files-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtherFilesListComponent implements OnInit {
    public readonly selectTypePlaceholder: string;
    public readonly otherFileTypes: Array<OtherFilesDropdownItem> = new Array<OtherFilesDropdownItem>();
    public readonly chosenFileTypes: Array<OtherFilesDropdownItem> = new Array<OtherFilesDropdownItem>();

    public q = this.activatedRoute.snapshot.queryParams.q;
    public eventsSubject: Subject<any> = new Subject<any>();
    searchControl = new FormControl(this.q);
    fileTypes = new FormControl(null);

    constructor(private readonly activatedRoute: ActivatedRoute) {
        this.createTypesDropdownItems();
        this.selectTypePlaceholder = 'Select Type';
    }

    ngOnInit(): void {
        this.searchControl.valueChanges
        .pipe(
            distinctUntilChanged(),
            debounceTime(300)
        )
        .subscribe((val) => {
            if (val.length === 0 || val.length >= minSearchLength) {
                this.eventsSubject.next({ term: val });
                return;
            }
            const q = this.activatedRoute.snapshot.queryParams.q;
            if (q && q.length >= minSearchLength && val.length < minSearchLength) {
                this.eventsSubject.next({ term: '' });
            }
        });

        this.fileTypes.valueChanges
            .pipe(
                distinctUntilChanged(),
                debounceTime(300)
            )
            .subscribe((val) => {
                    this.eventsSubject.next({ fileType: val });
                    return;
            });
    }

    private createTypesDropdownItems(): void {

        Object.keys(OtherFilesTypes).forEach((key: string) => {
            this.otherFileTypes.push({value: key, display: OtherFilesTypes[key]});
        });
    }
}
