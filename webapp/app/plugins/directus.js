import { createDirectus, rest, readItem, readItems, readUser, readUsers, readFile, readAssetRaw, readCollections } from '@directus/sdk';

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const directusUrl = config.public.directusUrl;
    const directus = createDirectus(directusUrl).with(rest());
    
    return {
        provide: { directus, readItem, readItems, readUser, readUsers, readFile, readAssetRaw, readCollections },
    };
});