import { Dispatch, SetStateAction } from "react";

export interface CommonDialog {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export interface ActionDialog extends CommonDialog {
    handleSend: () => {}
};

export interface DonationInfo {
    index: number;
    email: string;
    subject: string;
    content: string;
    recognitionName: string;
    amount: number;
    acknowledged?: {
        to: string;
        from: string;
        subject: string;
        content: string;
        sent: string;
    };
}