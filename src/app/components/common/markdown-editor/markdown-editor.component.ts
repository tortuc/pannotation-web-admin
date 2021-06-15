import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import * as SimpleMDE from 'simplemde';
import { UploadService } from '../../../services/uploads.service';

@Component({
    selector: 'app-markdown-editor',
    templateUrl: './markdown-editor.component.html',
    styleUrls: ['./markdown-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: MarkdownEditorComponent,
        multi: true
    }]
})
export class MarkdownEditorComponent implements ControlValueAccessor, AfterViewInit {
    private innerValue: string;

    @ViewChild('mdeContainer', { static: true })
    private mdeContainer: ElementRef;

    @ViewChild('imageInput', { static: true })
    private imageInput: ElementRef;

    private editorInstance: SimpleMDE;

    isDisabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private onChange: (val: string) => void;
    private onTouch: () => void;

    constructor (
        private readonly photoUploadService: UploadService,
    ) { }

    ngAfterViewInit (): void {
        const toolbar: (string|SimpleMDE.ToolbarIcon)[] = [
            'bold',
            'italic',
            'heading',
            'ordered-list',
            'unordered-list',
            'link',
            {
                name: 'image',
                action: this.triggerImageSelection.bind(this),
                className: 'fa fa-picture-o',
                title: 'Upload image',
            },
            'table',
            '|',
            'preview'
        ];

        const editorSettings: SimpleMDE.Options = {
            toolbar,
            element: this.mdeContainer.nativeElement,
        };

        this.editorInstance = new SimpleMDE(editorSettings);

        this.writeValue(this.innerValue);

        this.editorInstance.codemirror.on('change', () => {
            this.writeValue(this.editorInstance.value(), false);
        });
    }

    registerOnChange (fn: (val: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched (fn: () => void): void {
        this.onTouch = fn;
    }

    setDisabledState (isDisabled: boolean): void {
        this.isDisabled.next(isDisabled);
    }

    writeValue (value: string, shouldUpdateEditor: boolean = true): void {
        this.innerValue = value;

        if (shouldUpdateEditor && this.editorInstance) {
            this.editorInstance.value(value || '');
        }

        if (this.onChange) {
            this.onChange(value);
        }
    }

    private triggerImageSelection (editor: SimpleMDE): void {
        this.imageInput.nativeElement.click();
    }

    handleImageSelected (): void {
        const input: HTMLInputElement = this.imageInput.nativeElement;
        if (!input.files || !input.files.length) { return; }
        const body = new FormData();
        body.append('file', input.files[0]);

        this.photoUploadService
            .uploadImage(body, 'Image')
            .subscribe((response) => {
                const alt = 'Alt text';
                const title = 'Title text';
                const url = response.originalPath;

                this.editorInstance.codemirror.replaceSelection(`![${alt}](${url} "${title}")`);
            });
    }
}
