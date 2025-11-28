
export const useArticle = () => {

    const directusUrl = useRuntimeConfig().public.directusUrl;
    const { $directus, $readUsers, $readItems } = useNuxtApp();
    const { locale } = useLanguage();

    const getAuthorsByIds = async (userIds: string[]) => {
        const validUserIds = [...new Set(userIds)].filter(Boolean);
        if (validUserIds.length === 0) return [];

        const raw_authors = await $directus.request(
            $readUsers({
                filter: { id: { _in: validUserIds } },
                fields: ['first_name', 'last_name', 'avatar', 'title'], 
            })
        );

        // This maps the users stored in Directus to the format used by Nuxt.
        return raw_authors.map((author) => ({
            name: `${author.first_name} ${author.last_name}`,
            avatar: { 
                src: `${directusUrl}/assets/${author.avatar}`,
                alt: author.avatar ? author.first_name + ' ' + author.last_name : 'User Avatar',
                icon: 'i-lucide-user', 
            },
            description: author.title,
        }));
    };


    // Returns a raw article by slug, including authors
    const getArticleBySlug = async (slug: string) => {
        const response = await $directus.request(
            $readItems('articles', {
                filter: {
                    slug: { _eq: slug },
                    status: { _eq: 'published' }
                },
                limit: 1,
                fields: [ '*', { translations: [ '*' ] } ],
            })
        );

        //console.log('Fetched article response:', response);
        
        // Return 404 if no article is found
        if (response.length === 0 || !response[0]) return createError({ statusCode: 404, statusMessage: 'Article Not Found' });

        // Get the author from the IDs in the article
        const authors = await getAuthorsByIds([response[0].user_created, response[0].user_updated]);

        // Format the article published date and updated date
        const published = new Date(response[0].date_created).toLocaleDateString('sv-SE', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
        const updated = new Date(response[0].date_updated).toLocaleDateString('sv-SE', {
            year: 'numeric', month: 'long', day: 'numeric'
        });

        return {
            ...response[0],
            authors,
            published,
            updated,
        };
    };

    // Calls getArticleBySlug and processes localization returning a usable ref.
    const getArticleBySlugLocalized = (slug: string) => {
        const articleState = useState(`article-${slug}`, () => null as any);

        getArticleBySlug(slug).then((article) => {
            articleState.value = article;
        });

        const localizedArticle = computed(() => {
            const art = articleState.value;
            
            if (!art) return null;
                const localizedTranslation = art.translations?.find(
                (t:any) => t.languages_code === locale.value
            );

            return {
                ...art,
                title: localizedTranslation?.title || 'No title available',
                description: localizedTranslation?.description || 'No description available',
                content: localizedTranslation?.content || 'No content available',
            };
        });

        return localizedArticle;

    };


    const getArticleList = async (limit: number, sort: string) => {
        const response = await $directus.request(
            $readItems('articles', {
                fields: ['slug', 'date_created', 'user_created', 'user_updated', 'image', { translations: ['languages_code', 'title', 'description'] }],
                filter: { status: { _eq: 'published' } },
                limit,
            })
        );

        // Get authors for all articles and then map them to their respective articles
        const authorIds = response.map(article => article.user_created).concat(response.map(article => article.user_updated));
        const authors = await getAuthorsByIds(authorIds);
        response.forEach((article: any) => {
            article.authors = authors.filter(author => 
                authorIds.includes(article.user_created) || authorIds.includes(article.user_updated)
            );
        });

        // Remap the image field to include full URL and dates
        response.forEach((article: any) => {
            if (article.image) {
                article.image = `${directusUrl}/assets/${article.image}`;
            }

            article.date = new Date(article.date_created);
        });

        return response;
    }

    const getArticleListLocalized = (limit: number, sort: string) => {
        const listState = useState('article-list', () => [] as any[]);

        getArticleList(limit, sort).then((articles) => {
            listState.value = articles;
        });

        const localizedArticles = computed(() => {
            return listState.value.map((art: any) => {
                const localizedTranslation = art.translations?.find(
                    (t:any) => t.languages_code === locale.value
                );
                return {
                    ...art,
                    title: localizedTranslation?.title || 'No title available',
                    description: localizedTranslation?.description || 'No description available',
                };
            });
        });

        return localizedArticles;
    };



    return {
        getArticleBySlug,
        getArticleBySlugLocalized,
        getArticleList,
        getArticleListLocalized,
    };
};