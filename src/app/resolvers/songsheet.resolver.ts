import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { SongsheetModel } from '../models/songsheet/songsheet-model';
import { SongsheetsService } from '../services/songsheets.service';

@Injectable()
export class SongsheetResolver implements Resolve<SongsheetModel> {
    constructor(private readonly songsheetsService: SongsheetsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SongsheetModel> {
        const songsheetId = parseInt(route.params.id, 10);

        return this.songsheetsService.getSongsheet(songsheetId);
    }
}
