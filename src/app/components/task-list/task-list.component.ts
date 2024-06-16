import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  TaskDelete(id: number) {
    this.taskService.deleteTask(id);
    this.tasks = this.taskService.getTasks();
  }

  TaskToogle(task: Task) {
    task.completeStatus = !task.completeStatus;
    this.taskService.updateTask(task);
    this.taskService.getTasks();
  }

  changeBg(index: number) {
    const spanBtnAll: NodeListOf<HTMLSpanElement> =
      document.querySelectorAll('.checkmark');
    const spanBtn = spanBtnAll[index];
    if (spanBtn.style.backgroundSize === '1200%') {
      spanBtn.style.backgroundSize = '60%';
    } else spanBtn.style.backgroundSize = '1200%';

    const allTitle: NodeListOf<HTMLHRElement> =
      document.querySelectorAll('.task-title');
    const title = allTitle[index];
    const allDescription: NodeListOf<HTMLHRElement> =
      document.querySelectorAll('.task-description');
    const description = allDescription[index];
    if (
      title.style.textDecoration === 'none' &&
      description.style.textDecoration === 'none'
    ) {
      title.style.textDecoration = 'line-through';
      description.style.textDecoration = 'line-through';
    } else {
      title.style.textDecoration = 'none';
      description.style.textDecoration = 'none';
    }
  }
}
