import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();

    // Subscribe to task added notifications
    this.taskService.onTaskAdded().subscribe(() => {
      this.fetchTasks(); // Refresh the task list
    });
  }

  fetchTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      alert('Task deleted successfully!');
      this.fetchTasks(); 
    });
  }

  updateTask(taskId: number, status: string): void {
    const newStatus = status === 'Pending' ? 'Completed' : 'Pending';
    this.taskService.updateTask(taskId, newStatus).subscribe(() => {
      alert('Task status updated successfully!');
      this.fetchTasks();
    });
  }
}
