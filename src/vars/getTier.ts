export const getTier = (amount: number) => {
    return amount < 50
        ? ''
        : amount >= 50 && amount < 200
            ? 'Muse $50+'
            : amount >= 200 && amount < 500
                ? 'Dionysus $200+'
                : amount >= 500 && amount < 1000
                    ? 'Artemis $500+'
                    : amount >= 1000 && amount < 2500
                        ? 'Hermes $1000+'
                        : amount >= 2500 && amount < 5000
                            ? 'Athena $2500+'
                            : amount >= 5000 && amount < 10000
                                ? 'Apollo $5000+'
                                : 'Zeus & Hera $10,000+'
};