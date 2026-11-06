import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

function activeAt(now) {
    return {
        dateDebut: { lte: now },
        dateFin: { gte: now },
    };
}

const getCachedOnDutyPharmacySlugs = unstable_cache(
    async () => {
        const now = new Date();
        const rows = await prisma.periodeGarde.findMany({
            where: {
                ...activeAt(now),
                pharmacie: { statut: 'APPROUVEE' },
            },
            select: { pharmacie: { select: { slug: true } } },
            distinct: ['pharmacieId'],
        });

        return rows.map((row) => row.pharmacie.slug);
    },
    ['pharmacies-duty'],
    { revalidate: 300, tags: ['pharmacies-duty'] },
);

export function getOnDutyPharmacySlugs() {
    return getCachedOnDutyPharmacySlugs();
}
