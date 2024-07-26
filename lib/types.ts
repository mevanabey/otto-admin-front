import { ReactNode } from 'react';

export interface NavigationItem {
    label: string;
    link: string;
    icon?: ReactNode;
}