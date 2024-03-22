export interface Project {
    id: number;
    title: string;
    description: string;
    status: 'Not Started' | 'In Progress' | 'Completed';
    startDate: Date;
    endDate: Date;
}
