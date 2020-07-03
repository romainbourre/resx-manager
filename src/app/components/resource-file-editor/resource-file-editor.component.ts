import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl} from '@angular/forms';
import {InitializedResource, Key} from '../../pages/home-page/home-page.component';
import resx from 'resx';
import {saveAs} from 'file-saver';


export interface EditedResource {
  keys: Key[];
  content: {
    value: FormControl;
    comment: FormControl;
  }[];
}

@Component({
  selector: 'app-resource-file-editor',
  templateUrl: './resource-file-editor.component.html',
  styleUrls: ['./resource-file-editor.component.scss']
})
export class ResourceFileEditorComponent implements OnInit, OnChanges {
  @Input() resource: InitializedResource;
  @Input() await: boolean;

  editedResource: EditedResource;
  availableFilters: string[];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initFilter();
    this.initEdition();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  onFilterChange(keys: string[]) {
    this.editedResource.keys = this.resource.keys.filter(k => {
      const key = k.name.split('_')[0];
      return !!keys.find(i => i === key);
    });
  }

  exportEdited(): void {
    if (!this.editedResource || this.await) {
      return;
    }

    const final: object = [];
    this.editedResource.keys.forEach((k: Key) => {
      const content = this.editedResource.content[k.name];
      final[k.name] = {
        value: content.value.value,
        comment: content.comment.value
      };
    });
    resx.js2resx(final, (error, res) => {
      const blob = new Blob([res], {type: 'text/plain;charset=utf-8'});
      const now = new Date();
      const year = now.getFullYear();
      const month = ('0' + (now.getMonth() + 1)).slice(-2);
      const day = ('0' + now.getDate()).slice(-2);
      const fileName = `${year}${month}${day}_StringLibrary.resx`;
      saveAs(blob, fileName);
    });
  }

  reset(): void {
    this.initEdition();
  }

  private initEdition(): void {
    if (!this.resource || this.await) {
      return;
    }

    const edition: EditedResource = {
      keys: this.resource.keys,
      content: []
    };
    this.resource.keys.forEach((k: Key) => {
      edition.content[k.name] = {
        value: this.fb.control(this.resource.content[k.name].value),
        comment: this.fb.control(this.resource.content[k.name].comment)
      };
    });

    this.editedResource = edition;
  }

  private initFilter(): void {
    this.availableFilters = [];
    this.resource.keys.map(k => {
      const key = k.name.split('_')[0];
      if (!this.availableFilters.find(ky => ky === key)) {
        this.availableFilters.push(key);
      }
    });
  }
}
