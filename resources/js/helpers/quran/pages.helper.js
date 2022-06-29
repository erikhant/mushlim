import { PERPAGE_REQEST } from '@/api/api.client';

export const pagePositionByVerse = (verse) => {
    return Math.ceil(parseInt(verse) / PERPAGE_REQEST);
}