export const getTier = (amount: number) => {
    return amount <= 0
        ? ''
        : amount > 0 && amount < 250
            ? 'Muse $0+'
            : amount >= 250 && amount < 500
                ? 'Dionysus $250+'
                : amount >= 500 && amount < 1000
                    ? 'Artemis $500+'
                    : amount >= 1000 && amount < 5000
                        ? 'Hermes $1000+'
                        : amount >= 5000 && amount < 10000
                            ? 'Apollo $5000+'
                            : 'Zeus & Hera $10,000+';
};