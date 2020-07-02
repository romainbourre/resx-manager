import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import resx from 'resx';

export interface ImportedResource {
  keys: string[];
  content: object;
}

@Component({
  selector: 'app-resource-file-importer',
  templateUrl: './resource-file-importer.component.html',
  styleUrls: ['./resource-file-importer.component.scss']
})
export class ResourceFileImporterComponent implements OnInit {
  @Input() loading: false;

  @Output() imported: EventEmitter<ImportedResource>;

  importingFile = false;
  importedFile: File;
  errorWhenImporting = false;

  constructor() {
    this.imported = new EventEmitter<ImportedResource>();
  }

  ngOnInit(): void {
  }

  onFileImported(e): void {
    this.importedFile = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onloadstart = () => {
      this.errorWhenImporting = false;
      this.importingFile = true;
    };

    fileReader.onloadend = () => {
      const file = fileReader.result;

      resx.resx2js(file, (err, res) => {
        this.importingFile = false;

        if (err) {
          this.errorWhenImporting = true;
          return;
        }

        const importedResource: ImportedResource = {
          keys: Object.keys(res),
          content: res
        };

        this.imported.emit(importedResource);
      });
    };

    fileReader.readAsText(this.importedFile);
  }
}
