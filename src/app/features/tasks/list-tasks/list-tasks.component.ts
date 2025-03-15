import { Component, ElementRef, OnInit } from '@angular/core';
import { AddTasksComponent } from "../add-tasks/add-tasks.component";
import { TaskService } from '../../../core/services/task.service';
import { TaskModel } from '../../../models/task.model';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-list-tasks',
  imports: [AddTasksComponent],
  templateUrl: './list-tasks.component.html',
  styleUrl: './list-tasks.component.scss'
})
export class ListTasksComponent implements OnInit {

  taskList: TaskModel[] = [];
  filtroActual: string = 'todas';

  constructor(private _taskService: TaskService) {

  }
  ngOnInit(): void {
    this.getNotificaciones();
  }

  public getNotificaciones(): void {
    this._taskService.getTasks(this.filtroActual).subscribe({
      next: (value: TaskModel[]) => {
        this.taskList = value;
        console.log(this.taskList, 'list tareas');
      },
      error: (err: any) => {
        console.log("ERR GET COM", err)
      }
    });
  }

  public filtrarTareas(filtro: string): void {
    this.filtroActual = filtro;
    this.getNotificaciones();
  }

  public deleteTask(id: number | undefined): void {

    if (id === undefined) {
      console.error("Error: La tarea no tiene un ID válido");
      return;
    }
    this._taskService.deleteTask(id).subscribe(
      {
        next: (res) => {
          this.getNotificaciones();
          console.log(res, 'list tareas');
        },
        error: (err: any) => {
          console.log("ERR GET COM", err)
        }
      }
    );
  }

  public updateStatus(id: number, status: number): void {
    this._taskService.updateStatus(id, status).subscribe(
      {
        next: (res) => {
          this.getNotificaciones();
          console.log(res, 'list tareas');
        },
        error: (err: any) => {
          console.log("ERR GET COM", err)
        }
      }
    );
  }

  onStatusChange(event: Event, task: any) {
    const input = event.target as HTMLInputElement;
    if (input) {
      task.status = input.checked ? 1 : 0;
      this.updateStatus(task.id, task.status);
      console.log(task.status, 'estado');
    }
  }

  openModal() {
    const modalElement = document.getElementById('modalAdd');
    if (modalElement) {
      let modal = Modal.getInstance(modalElement);
      if (!modal) {
        modal = new Modal(modalElement);
      }
      modal.show();
    }
  }



}
