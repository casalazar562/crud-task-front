import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../core/services/task.service';
import { TaskModel } from '../../../models/task.model';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-add-tasks',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-tasks.component.html',
  styleUrl: './add-tasks.component.scss'
})
export class AddTasksComponent implements OnInit {

  @Output() taskAdded = new EventEmitter<void>();
  form: FormGroup;

  constructor(private fb: FormBuilder, private _taskService: TaskService, private el: ElementRef) {

    this.form = this.fb.group({
      tittle: [null, Validators.required],
      description: [null, Validators.required],
      status: [0, Validators.required],

    });
  }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.form.valid) {
      const taskBody: TaskModel = {
        tittle: this.form.value.tittle,
        description: this.form.value.description,
        status: parseInt(this.form.value.status),
      };
      this._taskService
        .addTask(taskBody)
        .subscribe({
          next: (res) => {
            console.log(res, 'guardado');
            this.taskAdded.emit();
            this.form.reset();
            this.closeModal();

          },
        });

    } else {
      this.form.markAllAsTouched();
    }
  }

  closeModal() {
    const modalElement = document.getElementById('modalAdd');
    if (modalElement) {
      const modal = Modal.getInstance(modalElement) || new Modal(modalElement);
      modal.hide();

      modalElement.addEventListener('hidden.bs.modal', () => {
        setTimeout(() => {
          const backdrop = document.querySelector('.modal-backdrop');
          if (backdrop) {
            backdrop.remove();
          }
          document.body.classList.remove('modal-open');
          document.body.style.removeProperty('overflow');
        }, 100);
      }, { once: true });
    }
  }

}
