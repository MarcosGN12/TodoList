import { Task } from '../../tasks/entities/task.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    tasks: Task[];
}
