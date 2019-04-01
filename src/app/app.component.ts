import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

export interface State {
  declarationTypeCode: string;
  declarationTypeCodeDescription: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    stateCtrl = new FormControl();
    filteredStates: Observable<State[]>;


    @Input() panelWidth: string | number;

    states: State[] = [
      {
        declarationTypeCode: 'IMA',
        declarationTypeCodeDescription: 'Standard customs declaration (Import not EFTA) - Goods arrived',
      },
      {
        declarationTypeCode: 'IMB',
        declarationTypeCodeDescription: 'Simplified declaration on an occasional basis (Import not EFTA) - Goods arrived',
      },
      {
        declarationTypeCode: 'IMD',
        declarationTypeCodeDescription: 'Standard customs declaration (Import not EFTA) - Goods not arrived',
      },
      {
        declarationTypeCode: 'COB',
        declarationTypeCodeDescription: 'Simplified declaration on an occasional basis (Trade new Member States) - Goods arrived',
      }
    ];

    constructor() {
      this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this._filterStates(state) : this.states.slice())
        );
    }

    private _filterStates(value: string): State[] {
      const filterValue = value.toLowerCase();

      return this.states.filter(state => state.declarationTypeCode.toLowerCase().indexOf(filterValue) === 0);
    }
  }
