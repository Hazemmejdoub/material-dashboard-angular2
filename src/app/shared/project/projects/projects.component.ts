import { Component } from '@angular/core';
import { DataTableConfig } from '../../data-table/data-table-config.model';
import { Project } from '../../data-table/project.model';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: Project[] = [
    { id: 1, title: 'Project 1', description: 'This is project 1', status: 'In Progress', startDate: new Date('2023-01-20'), endDate: new Date('2023-04-01') },
    { id: 2, title: 'Project 2', description: 'This is project 2', status: 'Completed', startDate: new Date('2023-02-01'), endDate: new Date('2023-05-01') },
    { id: 3, title: 'Project 3', description: 'This is project 3', status: 'Not Started', startDate: new Date('2023-03-01'), endDate: new Date('2023-06-01') },
    { id: 4, title: 'Project 4', description: 'This is project 4', status: 'In Progress', startDate: new Date('2023-04-01'), endDate: new Date('2023-07-01') },
    { id: 5, title: 'Project 5', description: 'This is project 5', status: 'Completed', startDate: new Date('2023-05-01'), endDate: new Date('2023-08-01') },
    { id: 1, title: 'aaa 1', description: 'This is project 1', status: 'In Progress', startDate: new Date('2023-01-01'), endDate: new Date('2023-04-01') },
    { id: 2, title: 'vv 2', description: 'This is project 2', status: 'Completed', startDate: new Date('2023-02-01'), endDate: new Date('2023-05-01') },
    { id: 3, title: 'bb 3', description: 'This is project 3', status: 'Not Started', startDate: new Date('2023-03-01'), endDate: new Date('2023-06-01') },
    { id: 4, title: 'vv 4', description: 'This is project 4', status: 'In Progress', startDate: new Date('2023-04-01'), endDate: new Date('2023-07-01') },
    { id: 5, title: 'Project 5', description: 'This is project 5', status: 'Completed', startDate: new Date('2023-05-01'), endDate: new Date('2023-08-01') }
  ];


  dataTableConfig: DataTableConfig = {
    fields: [
      { name: 'title', label: 'Title', type: 'string', sortable: true, filterable: true },
      { name: 'description', label: 'Description', type: 'string', sortable: true, filterable: true },
      { name: 'status', label: 'Status', type: 'string', sortable: true, filterable: true },
      { name: 'startDate', label: 'Start Date', type: 'date', sortable: true, filterable: true },
      { name: 'endDate', label: 'End Date', type: 'date', sortable: true, filterable: true },

    ],
    defaultSort: { field: 'title', direction: 'asc' },
    pagination: { pageSize: 5 },
    actions: {
      edit: (row) => console.log('Edit', row),
      delete: (row) => console.log('Delete', row),
      add: () => console.log('Add'),
    }
  }
}
