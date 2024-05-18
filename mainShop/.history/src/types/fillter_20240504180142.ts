export type FilterUpdate = {
    id: string;
    value: string;
    checked: boolean;
}

export type FilterOption = {
    value: string;
    label: string;
    checked: boolean;
}

type FilterSection = {
    id: string;
    name: string;
    options: FilterOption[];
}