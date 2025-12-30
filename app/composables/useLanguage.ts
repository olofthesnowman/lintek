// composables/useLocale.js
import { onMounted, watch } from 'vue';


// Define the possible types for safety
// type LocaleCode = 'en-US' | 'sv-SE';

export const useLanguage = () => {
  // 1. Create the global state using useState.
  const locale = useState('userLocale', () => 'sv');
  
  const fullLocale = computed(() => {
    return locale.value === 'en' ? 'en-US' : 'sv-SE';
  });
  
  const router = useRouter();

  // 2. Define the explicit setter function (action)
  const setLocale = (newLocale: 'en' | 'sv') => {
    locale.value = newLocale;
    useHead({ htmlAttrs: { lang: newLocale } });
    
    // Navigate to the new locale route
    const route = useRoute();
    if (route.params.locale === newLocale) {
      return; // No need to navigate if already on the correct locale
    }
    const newPath = route.fullPath.replace(`/${route.params.locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  const toggleLocale = () => {
    // If the current locale is en, switch to sv, otherwise switch to en
    const newLocale = locale.value === 'en' ? 'sv' : 'en';
    setLocale(newLocale);
  };

  // 3. Watch for changes in the locale state and sync to localStorage
  watch(locale, (newValue) => {
    // Use import.meta.client to safely access localStorage
    if (import.meta.client) {
      localStorage.setItem('user_locale', newValue);
    }
  });

  // 4. Initialize the state from localStorage when the app mounts on the client
  onMounted(() => {
    // Use import.meta.client to safely access localStorage
    if (import.meta.client) {
      const storedLocale = localStorage.getItem('user_locale');
      if (storedLocale && (storedLocale === 'en' || storedLocale === 'sv')) {
        locale.value = storedLocale;
      }
    }
  });

  // Return the reactive state (getter) and the setter function
  return {
    locale, // This is a reactive ref (the getter)
    fullLocale, // This is the computed full locale
    setLocale, // This is the function (the setter)
    toggleLocale, // This is the function to toggle the locale
  };
};