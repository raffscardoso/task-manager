import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  form: FormGroup;
  formSubmitted: boolean = false;

  title: string = '';
  description: string = '';
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      title: [this.title, [Validators.required]],
      description: [this.description],
    });
  }

  onSubmit() {
    this.formSubmitted = true;
    if (!this.form.valid) {
      alert('Formulário Inválido');
    } else {
      const newTask: Task = {
        id: 0,
        title: this.title,
        description: this.description,
        completeStatus: false,
      };
      this.taskService.addTask(newTask);
      this.title = '';
      this.description = '';
    }
    this.form.reset();
    this.formSubmitted = false;
  }

  addDescription() {
    const formDescriptionContainer: HTMLDivElement = document.querySelector(
      '.form-description-container'
    )!;
    const addDescriptionBtn: HTMLButtonElement = document.querySelector(
      '.add-description-btn'
    )!;
    formDescriptionContainer.style.display = 'block';
    addDescriptionBtn.style.display = 'none';
  }
}
