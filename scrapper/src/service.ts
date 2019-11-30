export const requireValue = (value: any) => {
    if (!value || value === "") {
        throw Error("Value required");
    }

    return value;
};

export const randomBetween = (start, end) => {
    return Math.floor(Math.random() * end) + start;
};

export const amountToFloat = (amount: string): number => {
    return parseFloat(amount.replace(/[A-Z ,]+/, ""));
};
