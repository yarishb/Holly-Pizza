interface Option {
    value: string,
    label: string
}

interface StaffOptions {
    value: boolean,
    label: string
}

export const options: Option[] = [
    { value: 'small', label: 'Мала' },
    { value: 'medium', label: 'Середня' },
    { value: 'large', label: 'Велика' },
];

export const staff_options: StaffOptions[] = [
    { value: true, label: 'true' },
    { value: false, label: 'false' },
];


export const fileTypes: Array<string> = ['image/jpeg', 'image/png', 'image/jpg'];
