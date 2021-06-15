import { NgModule } from '@angular/core';

import { UserRolesPipe } from './user-roles.pipe';
import { PayoutRequestStatusPipe } from './payout-request-status.pipe';
import { SecureImageUrlPipe } from './secure-image-url';
import { SafePipe } from './save-urls';
import { PhonePipe } from './phone-numbers';
import { OtherFilePipe } from './other-file.pipe';
import { LineBreakPipe } from './line-break.pipe';

@NgModule({
    imports: [],
    declarations: [
        UserRolesPipe,
        PayoutRequestStatusPipe,
        SecureImageUrlPipe,
        SafePipe,
        PhonePipe,
        OtherFilePipe,
        LineBreakPipe,
    ],
    exports: [
        UserRolesPipe,
        PayoutRequestStatusPipe,
        SecureImageUrlPipe,
        SafePipe,
        PhonePipe,
        OtherFilePipe,
        LineBreakPipe,
    ]
})
export class PipeModule {
    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}
