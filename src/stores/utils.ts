import type { LocationQuery } from "vue-router";

interface OptionsObject {
    [key: number]: string | number;
}

export function isObjectEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
}

export function parseDesignsQuery(query: LocationQuery): OptionsObject {
    const options: OptionsObject = {};

    Object.keys(query).forEach((key: string) => {
        const match = key.match(/^designs\[(\d+)\]$/);

        if (match) {
            const index = parseInt(match[1], 10);
            options[index] = Number(query[key]);
        }
    });

    return options;
}

export function parseOptionsQuery(query: LocationQuery, keys: number[] = []): OptionsObject {
    const options: OptionsObject = {};

    Object.keys(query).forEach((key: string) => {
        const match = key.match(/^options\[(\d+)\]$/);

        if (match) {
            const index = parseInt(match[1], 10);
            options[index] = keys.includes(index) ? String(query[key]) : Number(query[key]);
        }
    });

    return options;
}

export function removeValueFromArray<T>(arr: T[], value: T): T[] {
    return arr.filter(item => item !== value);
}