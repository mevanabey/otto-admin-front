import React from 'react';
import { LayoutDashboard } from "lucide-react";

import { NavigationItem } from "./types";


export const navigation: NavigationItem[] = [
    {
        label: 'Home',
        link: '/',
        icon: React.createElement(LayoutDashboard)
    }
]

export const orderProcess: any = {
    pending: {
        nextAction: 'prepare_quote',
        allowed_actions: ['prepare_quote', 'cancel_order']
    },
    prepare_quote: {
        nextAction: 'send_quote',
        allowed_actions: ['send_quote', 'cancel_order']
    },
    send_quote: {
        nextAction: 'send_invoice',
        allowed_actions: ['wait_for_quote_acceptance', 'cancel_order', 'amend_quote']
    },

}