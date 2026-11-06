export const mockPharmacies = [
    {
        name: 'Pharmacie du Marché',
        neighborhood: 'Poto-Poto',
        city: 'Brazzaville',
        hours: '8h à 20h',
        approvalStatus: 'APPROUVEE',
        stocks: [
            { medicine: 'Paracétamol', status: 'Disponible', price: 850, updatedAt: 'il y a 2 h' },
            { medicine: 'Amoxicilline', status: 'Stock faible', price: 1500, updatedAt: 'il y a 4 h' },
            { medicine: 'Ibuprofène', status: 'Rupture', price: null, updatedAt: 'il y a 3 jours' },
        ],
    },
    {
        name: 'Pharmacie Saint-Joseph',
        neighborhood: 'Bacongo',
        city: 'Brazzaville',
        hours: '8h à 19h',
        approvalStatus: 'APPROUVEE',
        stocks: [
            { medicine: 'Paracétamol', status: 'Disponible', price: 900, updatedAt: 'il y a 5 h' },
            { medicine: 'Amoxicilline', status: 'Disponible', price: 1700, updatedAt: 'hier' },
        ],
    },
    {
        name: 'Pharmacie de la Paix',
        neighborhood: 'Moungali',
        city: 'Brazzaville',
        hours: '8h à 20h',
        approvalStatus: 'APPROUVEE',
        stocks: [
            { medicine: 'Paracétamol', status: 'Stock faible', price: 800, updatedAt: 'hier' },
            { medicine: 'Ibuprofène', status: 'Disponible', price: 1200, updatedAt: 'il y a 1 h' },
        ],
    },
    {
        name: 'Pharmacie Les Palmiers',
        neighborhood: 'Talangaï',
        city: 'Brazzaville',
        hours: '9h à 18h',
        approvalStatus: 'APPROUVEE',
        stocks: [
            { medicine: 'Paracétamol', status: 'Rupture', price: null, updatedAt: 'il y a 3 jours' },
            { medicine: 'Amoxicilline', status: 'Disponible', price: 1600, updatedAt: 'il y a 2 h' },
        ],
    },
    {
        name: 'Pharmacie en attente',
        neighborhood: 'Centre-ville',
        city: 'Brazzaville',
        hours: '8h à 18h',
        approvalStatus: 'EN_ATTENTE',
        stocks: [
            { medicine: 'Paracétamol', status: 'Disponible', price: 700, updatedAt: 'il y a 1 h' },
        ],
    },
];
