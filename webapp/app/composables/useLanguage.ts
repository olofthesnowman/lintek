// composables/useLocale.js
import { onMounted, watch } from 'vue';

// Define the possible types for safety
// type LocaleCode = 'en-US' | 'sv-SE';

export const useLanguage = () => {
  // 1. Create the global state using useState.
  const locale = useState('userLocale', () => 'sv-SE');

  // 2. Define the explicit setter function (action)
  const setLocale = (newLocale: 'en-US' | 'sv-SE') => {
    locale.value = newLocale;
  };

  const toggleLocale = () => {
    // If the current locale is en-US, switch to sv-SE, otherwise switch to en-US
    const newLocale = locale.value === 'en-US' ? 'sv-SE' : 'en-US';
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
      if (storedLocale && (storedLocale === 'en-US' || storedLocale === 'sv-SE')) {
        locale.value = storedLocale;
      }
    }
  });

  // Return the reactive state (getter) and the setter function
  return {
    locale, // This is a reactive ref (the getter)
    setLocale, // This is the function (the setter)
    toggleLocale, // This is the function to toggle the locale
  };
};