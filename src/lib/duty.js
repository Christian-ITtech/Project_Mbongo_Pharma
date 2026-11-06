import { cacheLife, cacheTag } from 'next/cache';
import { prisma } from '@/lib/prisma';

function activeAt(now) {
    return {
        dateDebut: { lte: now },
        dateFin: { gte: now },
    };
}

export async function getOnDutyPharmacySlugs() {
    'use cache';

    cacheLife({ stale: 300, revalidate: 300, expire: 3600 });
    cacheTag('pharmacies-duty');

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
}
