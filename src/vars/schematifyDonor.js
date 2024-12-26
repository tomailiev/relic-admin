import normalizePhoneNumber from "./normalizePhoneNumber";

export default function schematifyDonor(item) {
    const lastDonation = { lastDonationAmount: '', lastDonationDate: '' }
    const donations = item.donations.map((donation) => {
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