import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-confirmation-dialog',
    templateUrl: './confirmation-dialog.component.html',
    styleUrls: ['./confirmation-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
    result = new BehaviorSubject<boolean>(false);
    data: any;

    constructor(public dialogRef: BsModalRef) {
    }

    onActionClick(result: boolean): void {
        this.result.next(result);
        this.dialogRef.hide();
    }

}
