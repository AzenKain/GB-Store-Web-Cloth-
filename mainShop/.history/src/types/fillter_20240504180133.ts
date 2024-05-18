type FilterUpdate = {
    id: string;
    value: string;
    checked: boolean;
}

type FilterOption = {
    value: string;
    label: string;
    checked: boolean;
}

type FilterSection = {
    id: string;
    name: string;
    options: FilterOption[];
}