import { OtherFilesTypes } from '../../../../core/enums/other-files-types';

export const formErrorsMap = {
    name: {
        required: 'Name is required',
        minlength: 'Name must be from 3 to 250 symbols',
        maxlength: 'Name must be from 3 to 250 symbols',
        pattern: 'Name cannot contain spaces only'
    },
    fileType: {
        required: 'Type is required'
    },
    imageId: {
        required: 'Image is required',
        min: 'Image id is invalid',
        max: 'Image id is invalid'
    },
    fileId: {
        required: 'File is required',
        min: 'File id is invalid',
        max: 'File id is invalid',
    },
};

export interface OtherFilesPageNamings {
    [key: string]: string;
}

export const createFilesNames = (page: string): OtherFilesPageNamings[] => {
    const names = Object.keys(OtherFilesTypes)
        .map((key: string) => ({
            key,
            title: `${page} ${OtherFilesTypes[key]}`,
            name: `${OtherFilesTypes[key]} name`,
            btn: `${page} ${OtherFilesTypes[key]}`
        }));
    names.push({
        key: 'default',
        title: `${page} Article`,
        name: 'Article name',
        btn: `${page} Article`
    });

    return names;
};
