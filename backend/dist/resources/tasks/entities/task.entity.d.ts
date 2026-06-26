import { User } from '../../users/entities/user.entity';
export declare class Task {
    id: number;
    name: string;
    description: string;
    endDate: Date;
    state: string;
    user: User;
}
