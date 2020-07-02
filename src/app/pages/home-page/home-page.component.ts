import { Component, OnInit } from '@angular/core';
import {ImportedResource} from '../../components/resource-file-importer/resource-file-importer.component';

export interface Key {
  name: string;
  translated: boolean;
}

export interface InitializedResource {
  keys: Key[];
  content: object;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  importedResource: ImportedResource;
  initializedResource: InitializedResource;

  constructor() { }

  ngOnInit(): void {
  }

  get totalKeysNumber(): number {
    if (!this.initializedResource) {
      return 0;
    }
    return this.initializedResource.keys.length;
  }

  onFileImported(resource: ImportedResource) {
    this.importedResource = resource;
    this.initResource(resource);
  }

  private initResource(resource: ImportedResource) {
    const keys = this.generateKeys(resource.keys);
    this.initializedResource = {
      keys,
      content: resource.content
    };
  }

  private generateKeys(keys: string[]): Key[] {
    return keys.map(k => {
      const key: Key = {
        name: k,
        translated: false
      };
      return key;
    });
  }
}
