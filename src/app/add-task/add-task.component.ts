
import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  title = '';

  constructor(private taskService: TaskService) {}

  addTask(): void {
    if (this.title.trim()) {
      this.taskService.addTask({ title: this.title }).subscribe(() => {
        this.title = ''; 
        alert('Task added successfully!');
        this.taskService.notifyTaskAdded();
      });
    }
  }
}
