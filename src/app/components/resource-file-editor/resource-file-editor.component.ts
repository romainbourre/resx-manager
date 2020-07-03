import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {InitializedResource, Key} from '../../pages/home-page/home-page.component';
import resx from 'resx';
import {saveAs} from 'file-saver';


@Component({
  selector: 'app-resource-file-editor',
  templateUrl: './resource-file-editor.component.html',
  styleUrls: ['./resource-file-editor.component.scss']
})
export class ResourceFileEditorComponent implements OnInit, OnChanges {
  @Input() resource: InitializedResource;
  @Input() await: boolean;

  editedValues: object;
  editedComments: object;
  availableFilters: string[];
  filteredKey: Key[];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initFilter();
    this.initEdition();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }

  onFilterChange(keys: string[]) {
    this.filteredKey = this.resource.keys.filter(k => {
      const key = k.name.split('_')[0];
      return !!keys.find(i => i === key);
    });
  }

  exportEdited(): void {
    if (!this.editedValues || this.await) {
      return;
    }

    const final: object = [];
    this.filteredKey.forEach((k: Key) => {
      final[k.name] = {
        value: this.editedValues[k.name].value,
        comment: this.editedComments[k.name].value
      };
    });
    console.log(typeof final, final);
    resx.js2resx(final, (error, res) => {
      const blob = new Blob([res], {type: 'text/plain;charset=utf-8'});
      const now = new Date();
      saveAs(blob, `${now.getFullYear()}${now.getMonth()}${now.getDate()}_StringLibrary.resx`);
    });
  }

  reset(): void {
    this.initEdition();
  }

  private initEdition(): void {
    if (!this.resource || this.await) {
      return;
    }

    const copyOfValues = [];
    const copyOfComments = [];
    this.resource.keys.forEach((k: Key) => {
      copyOfValues[k.name] = this.fb.control(this.resource.content[k.name].value);
      copyOfComments[k.name] = this.fb.control(this.resource.content[k.name].comment);
    });

    this.filteredKey = this.resource.keys;
    this.editedValues = copyOfValues;
    this.editedComments = copyOfComments;
  }

  private initFilter(): void {
    this.filteredKey = this.resource.keys;
    this.availableFilters = [];
    this.resource.keys.map(k => {
      const key = k.name.split('_')[0];
      if (!this.availableFilters.find(ky => ky === key)) {
        this.availableFilters.push(key);
      }
    });
  }
}
