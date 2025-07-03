import { Controller, Post, Body } from '@nestjs/common';
import { CreateTaskDto } from './types/create-task-dto';

@Controller('taskService')
export class TaskController {
  @Post('task')
  createTask(@Body() createTaskDto: CreateTaskDto) {
    console.log('Create Task endpoint hit');
    console.log('Task Details:', createTaskDto);
    // Here you would typically call a service to handle the task creation logic
    return { message: 'Task created successfully', task: createTaskDto };
  }
}
