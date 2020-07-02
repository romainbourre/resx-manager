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

  edited: object;
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
    if (!this.edited || this.await) {
      return;
    }

    const final = [];
    this.filteredKey.forEach((k: Key) => {
      final[k.name] = this.edited[k.name].value;
    });
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

    const copy = [];
    this.resource.keys.forEach((k: Key) => {
      copy[k.name] = this.fb.control(this.resource.content[k.name]);
    });

    this.filteredKey = this.resource.keys;
    this.edited = copy;
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
