import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { columnNames, hereos } from './data';

import { minBy, maxBy } from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  // Private data source
  private heroes$ = new BehaviorSubject(hereos);

  // Public Observable for table
  dataSource$: Observable<any[]>;

  // Array of column names
  columns = columnNames;

  minMax$: Observable<any>;

  // Pagination data
  currentPage$ = new BehaviorSubject(1);
  dataOnPage$: Observable<any[]>;

  pageSize = 2;

  constructor() {}

  ngOnInit() {
    this.dataSource$ = this.heroes$.pipe(map(v => Object.values(v)));

    this.minMax$ = this.heroes$.pipe(
      map(v => {
        const values = Object.values(v);
        const max = maxBy(values, 'health').name;
        const min = minBy(values, 'health').name;
        return { min, max };
      })
    );

    // Sliced data for pagination
    this.dataOnPage$ = this.currentPage$.pipe(
      switchMap(() => this.heroes$),
      map(v => {
        const idx = (this.currentPage$.value - 1) * this.pageSize;
        return Object.values(v).slice(idx, idx + this.pageSize);
      })
    );
  }

  levelUp(heroName: string) {
    const updatedHero = this.heroes$.value[heroName];

    updatedHero.attack++;
    updatedHero.defense++;
    updatedHero.speed++;
    updatedHero.recovery++;
    updatedHero.healing++;
    updatedHero.health++;

    const newHeroData = { ...this.heroes$.value, [heroName]: updatedHero };

    this.heroes$.next(newHeroData);
  }
}
