import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '../../types/page.type';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);

    return await this.taskRepository.save(task);
  }

  async findAll(pageNumber: number = 0): Promise<Page<Task>> {
    const limit = 10;
    const currentPage = pageNumber < 1 ? 1 : pageNumber;
    const skip = (pageNumber - 1) * limit;

    const [tasks, totalCount] = await this.taskRepository.findAndCount({
      take: limit,
      skip: skip,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: tasks,
      currentPage: currentPage,
      totalPages: totalPages,
    };
  }

  findOne(id: number) {
    const task = this.taskRepository.findOne({ where: { id } });

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    if (updateTaskDto.name) {
      task.name = updateTaskDto.name;
    }

    if (updateTaskDto.description) {
      task.description = updateTaskDto.description;
    }

    if (updateTaskDto.endDate) {
      task.endDate = updateTaskDto.endDate;
    }

    if (updateTaskDto.state) {
      task.state = updateTaskDto.state;
    }

    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task not found`);
    }

    return this.taskRepository.remove(task);
  }
}
