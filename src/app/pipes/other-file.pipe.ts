import { Pipe, PipeTransform } from '@angular/core';

import { OtherFilesTypes } from '../core/enums/other-files-types';

@Pipe({
  name: 'otherFile'
})
export class OtherFilePipe implements PipeTransform {

  transform(value: any): any {
    return OtherFilesTypes[value];
  }

}
