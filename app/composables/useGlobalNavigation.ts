export const useGlobalNavigation = async () => {
    
    const data = useState<any>('global-navigation-data', () => null as any);

    //const directusUrl = useRuntimeConfig().public.directusUrl;
    const { $directus, $readItems } = useNuxtApp();
    const { locale } = useLanguage();

    // Fetch global navigation data on composable initialization
    const { data: globalData } = await useAsyncData('global-data', async () => {
        return $directus.request(
            $readItems('global', {
                fields: [{ translations: ['*'] }],
                limit: 1,
            })
        );
    });

    if (globalData.value) {
        data.value = globalData.value;
    }

    const navbarItems = computed(() => {
        if (!data.value?.translations) return [];

        const localizedData = data.value.translations.find(
            (item: any) => item.languages_code === locale.value
        );

        if (!localizedData?.navigation_menu) return [];

        try {
            console.log("Parsing navigation menu JSON:", localizedData.navigation_menu);
            return JSON.parse(localizedData.navigation_menu);
        } catch (e) {
            console.error("Error parsing navigation menu JSON:", e);
            return [];
        }
    });

    const footerColumns = computed(() => {
        if (!data.value?.translations) return [];

        const localizedData = data.value.translations.find(
            (item: any) => item.languages_code === locale.value
        );

        if (!localizedData?.footer_columns) return [];

        try {
            return JSON.parse(localizedData.footer_columns);
        } catch (e) {
            console.error("Error parsing footer columns JSON:", e);
            return [];
        }
    });

    return {
        navbarItems,
        footerColumns,
    };
};