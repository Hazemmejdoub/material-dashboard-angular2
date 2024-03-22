export interface DataTableConfig {
    fields: {
        name: string;
        label: string;
        type: 'string' | 'number' | 'date';
        sortable?: boolean;
        filterable?: boolean;
    }[];
    defaultSort?: {
        field: string;
        direction: 'asc' | 'desc';
    };
    pagination?: {
        pageSize: number;
    };
    actions?: {
        edit?: (row: any) => void;
        delete?: (row: any) => void;
        add?: () => void;
    };
}
