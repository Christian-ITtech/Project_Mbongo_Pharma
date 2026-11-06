import { cacheLife, cacheTag } from 'next/cache';
import { mockPharmacies } from './mock-pharmacies';

export async function getApprovedPharmacies() {
    'use cache';

    cacheLife({ stale: 60, revalidate: 60, expire: 3600 });
    cacheTag('pharmacies');

    return mockPharmacies.filter((pharmacy) => pharmacy.approvalStatus === 'APPROUVEE');
}

export async function getApprovedPharmacyBySlug(slug) {
    'use cache';

    cacheLife({ stale: 60, revalidate: 60, expire: 3600 });
    cacheTag('pharmacies');

    return mockPharmacies.find(
        (pharmacy) => pharmacy.slug === slug && pharmacy.approvalStatus === 'APPROUVEE',
    ) ?? null;
}
