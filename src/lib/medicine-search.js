import { mockPharmacies } from './mock-search-data.js';

export function normalizeMedicineName(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase('fr')
        .trim()
        .replace(/\s+/g, ' ');
}

export function searchPharmaciesByMedicine(query) {
    const normalizedQuery = normalizeMedicineName(query);

    if (!normalizedQuery) {
        return [];
    }

    return mockPharmacies.flatMap((pharmacy) => {
        if (pharmacy.approvalStatus !== 'APPROUVEE') {
            return [];
        }

        const matchingStocks = pharmacy.stocks.filter((stock) =>
            normalizeMedicineName(stock.medicine).includes(normalizedQuery),
        );

        return matchingStocks.map((stock) => ({ ...pharmacy, stock }));
    });
}
