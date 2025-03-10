import { Donation, Donor } from "../types/DB";
import normalizePhoneNumber from "./normalizePhoneNumber";

type DonationProps = {
    lastDonationAmount: string | number,
    lastDonationDate: string
};

export default function schematifyDonor(item: Donor) {

    const lastDonation: DonationProps = { lastDonationAmount: '', lastDonationDate: '' }
    const donations = item.donations.map((donation: Donation) => {
        if (!lastDonation.lastDonationDate || new Date(donation.date) > new Date(lastDonation.lastDonationDate)) {
            lastDonation.lastDonationDate = donation.date;
            lastDonation.lastDonationAmount = Number(donation.amount);
        }
        return {
            ...donation,
            amount: Number(donation.amount),
            recognitionName: donation.recognitionName || `${item.firstName} ${item.lastName}`,
        }
    });
    return {
        ...item,
        email: item.email?.toLowerCase() || '',
        phone: normalizePhoneNumber(item.phone),
        ...lastDonation,
        donations
    };
};