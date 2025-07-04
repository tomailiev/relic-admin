import { Donation } from "../types/DB"
import { oneYearAgoFromTomorrow, today } from "./dateObjects"

export const reduceDonations = (donations: Donation[], startDate = oneYearAgoFromTomorrow, endDate = today) => {
    return donations
        .filter(donation => new Date(donation.date) >= startDate && new Date(donation.date) <= endDate)
        .reduce((a, c) => a + Number(c.amount), 0)
}