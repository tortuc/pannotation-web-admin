import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { CommonFilter, UrlFilter } from '../../libs/tables';

@Directive({
    selector: '[sortingHeader]',
})
export class SortingHeaderDirective implements OnInit {
    @Input() sortingAttribute = '';
    @Input() width = 'auto';
    @Input() filter: UrlFilter<CommonFilter>;
    @Input() sortingMode = 'desc';
    initialClassNames: string;

    constructor(private readonly el: ElementRef) {}

    ngOnInit() {
        this.applySortingMode();
        this.el.nativeElement.style.width = this.width;
        this.initialClassNames = this.el.nativeElement.className || '';
    }

    @HostListener('click') onClick() {
        this.switchSortingMode();
    }

    switchSortingMode() {
        if (this.sortingMode === 'desc') {
            this.sortingMode = 'asc';
        } else {
            this.sortingMode = 'desc';
        }
        this.applySortingMode();

        if (this.sortingMode && this.sortingAttribute) {
            this.filter.setAll({
                orderBy: this.sortingAttribute,
                orderType: this.sortingMode,
            });
        }
    }

    private applySortingMode() {
        this.el.nativeElement.className = this.initialClassNames;
        this.el.nativeElement.className += ' sorting';
        if (this.sortingMode) {
            this.el.nativeElement.className += ` sorting_${this.sortingMode}`;
        }
    }
}
