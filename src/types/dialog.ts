import { Dispatch, SetStateAction } from "react";

export interface CommonDialog {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export interface ActionDialog extends CommonDialog {
    handleSend: () => {}
};

export interface DonationInfo {
    email: string;
    subject: string;
    content: string;
    recognitionName: string;
    amount: string;
    acknowledged?: {
        to: string;
        from: string;
        subject: string;
        content: string;
        sent: string;
    };
}