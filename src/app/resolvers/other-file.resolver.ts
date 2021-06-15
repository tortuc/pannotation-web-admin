import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { OtherFile } from '../models/other-files/other-file';
import { OtherFilesService } from '../services/other-files.service';
import { OtherFileModel } from '../models/other-files/other-file-model';

@Injectable()
export class OtherFileResolver implements Resolve<OtherFile> {
    constructor(private readonly ofService: OtherFilesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OtherFileModel> {
        const otherFileId = parseInt(route.params.id, 10);

        return this.ofService.getOne(otherFileId);
    }
}
