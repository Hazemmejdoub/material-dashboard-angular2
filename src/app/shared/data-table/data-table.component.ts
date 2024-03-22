import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataTableConfig } from './data-table-config.model';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() data: any[];
  @Input() config: DataTableConfig;

  displayedColumns: string[];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = this.config.fields.map(field => field.name);
    this.dataSource = new MatTableDataSource<any>(this.data);

    if (this.config.defaultSort) {
      this.sort.active = this.config.defaultSort.field;
      this.sort.direction = this.config.defaultSort.direction;
    }

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
}
