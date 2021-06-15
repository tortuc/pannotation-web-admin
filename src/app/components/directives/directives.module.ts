import { NgModule } from '@angular/core';
import { SortingHeaderDirective } from './sorting-header';

@NgModule({
    declarations: [
        SortingHeaderDirective
    ],
    exports: [
        SortingHeaderDirective
    ],
})
export class DirectivesModule {
}
