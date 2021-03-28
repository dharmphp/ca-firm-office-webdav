// Angular Task Component
import { Component, OnInit } from '@angular/core';

export interface TaskItem {
  id: string;
  clientName: string;
  taskType: string;
  dueDate: string;
  status: string;
  documentKey: string;
}

@Component({
  selector: 'app-task-list',
  template: `
    <div class="task-dashboard">
      <h2>CA Firm Compliance Desk</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Type</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let t of tasks">
            <td>{{ t.clientName }}</td>
            <td><span class="badge">{{ t.taskType }}</span></td>
            <td>{{ t.dueDate }}</td>
            <td>{{ t.status }}</td>
            <td>
              <button (click)="openInOffice(t.documentKey, 'excel')" class="btn btn-sm btn-success">
                Open in Excel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [
    { id: '1', clientName: 'Reliance Retail Franchise', taskType: 'GST_FILING', dueDate: '2021-04-20', status: 'IN_PROGRESS', documentKey: 'clients/rrf/gstr3b_march2021.xlsx' },
    { id: '2', clientName: 'Gujarat Infotech Pvt Ltd', taskType: 'TDS_RETURN', dueDate: '2021-04-30', status: 'PENDING', documentKey: 'clients/gi/tds_q4_26q.xlsx' }
  ];

  ngOnInit() {}

  openInOffice(documentKey: string, officeType: string) {
    // Uses Microsoft Office URI Scheme to invoke native desktop application via WebDAV
    const token = localStorage.getItem('auth_token');
    const webdavUrl = encodeURIComponent(`https://portal.cafirm.in/webdav/${documentKey}?token=${token}`);
    const scheme = officeType === 'excel' ? 'ms-excel' : 'ms-word';
    window.location.href = `${scheme}:ofe|u|${webdavUrl}`;
  }
}
