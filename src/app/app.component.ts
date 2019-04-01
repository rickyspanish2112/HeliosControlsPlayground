import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';

export interface State {
  declarationTypeCode: string;
  declarationTypeCodeDescription: string;
}

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

    stateCtrl = new FormControl();
    filteredStates: Observable<State[]>;

    stateForm: FormGroup = this.fb.group({
      stateGroup: '',
    });

    @Input() panelWidth: string | number;


    stateGroups: StateGroup[] = [{
      letter: 'A',
      names: ['Alabama', 'Alaska', 'Arizona', 'Arkansas']
    }, {
      letter: 'C',
      names: ['California', 'Colorado', 'Connecticut']
    }, {
      letter: 'D',
      names: ['Delaware']
    }, {
      letter: 'F',
      names: ['Florida']
    }, {
      letter: 'G',
      names: ['Georgia']
    }, {
      letter: 'H',
      names: ['Hawaii']
    }, {
      letter: 'I',
      names: ['Idaho', 'Illinois', 'Indiana', 'Iowa']
    }, {
      letter: 'K',
      names: ['Kansas', 'Kentucky']
    }, {
      letter: 'L',
      names: ['Louisiana']
    }, {
      letter: 'M',
      names: ['Maine', 'Maryland', 'Massachusetts', 'Michigan',
        'Minnesota', 'Mississippi', 'Missouri', 'Montana']
    }, {
      letter: 'N',
      names: ['Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
        'New Mexico', 'New York', 'North Carolina', 'North Dakota']
    }, {
      letter: 'O',
      names: ['Ohio', 'Oklahoma', 'Oregon']
    }, {
      letter: 'P',
      names: ['Pennsylvania']
    }, {
      letter: 'R',
      names: ['Rhode Island']
    }, {
      letter: 'S',
      names: ['South Carolina', 'South Dakota']
    }, {
      letter: 'T',
      names: ['Tennessee', 'Texas']
    }, {
      letter: 'U',
      names: ['Utah']
    }, {
      letter: 'V',
      names: ['Vermont', 'Virginia']
    }, {
      letter: 'W',
      names: ['Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    }];

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

    stateGroupOptions: Observable<StateGroup[]>;

    constructor(private fb: FormBuilder) {
      this.filteredStates = this.stateCtrl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this._filterStates(state) : this.states.slice())
        );
    }

    ngOnInit(): void {
      this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
    }

    private _filterGroup(value: string): StateGroup[] {
      if (value) {
        return this.stateGroups
          .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
          .filter(group => group.names.length > 0);
      }

      return this.stateGroups;
    }

    private _filterStates(value: string): State[] {
      const filterValue = value.toLowerCase();

      return this.states.filter(state => state.declarationTypeCode.toLowerCase().indexOf(filterValue) === 0);
    }
  }
