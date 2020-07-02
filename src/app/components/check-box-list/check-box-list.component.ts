import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Form, FormControl} from '@angular/forms';

export interface CheckBoxItem {
  key: string;
  name: string;
  control: FormControl;
}

export declare type CheckBoxItems = CheckBoxItem[];

@Component({
  selector: 'app-check-box-list',
  templateUrl: './check-box-list.component.html',
  styleUrls: ['./check-box-list.component.scss']
})
export class CheckBoxListComponent implements OnInit {
  @Input() items: string[];
  @Input() default = true;

  @Output() selected = new EventEmitter<string[]>();

  all: FormControl;
  itemsControls: FormControl[] = [];

  constructor() { }

  ngOnInit(): void {
    this.all = new FormControl(this.default);
    this.items.forEach((_, index) => this.itemsControls[index] = new FormControl(this.default));
    this.updateSelected();
  }

  onAllChange(): void {
    this.itemsControls.forEach(i => i.setValue(this.all.value));
    this.updateSelected();
  }

  onKeyChange(): void {
    const isAllItemsActivated = this.itemsControls.every(i => i.value);
    this.all.setValue(isAllItemsActivated);
    this.updateSelected();
  }

  private updateSelected(): void {
    const itemsFiltered = this.items.filter((i, index) => this.itemsControls[index].value);
    this.selected.emit(itemsFiltered);
  }
}
