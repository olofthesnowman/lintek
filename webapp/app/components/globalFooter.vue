<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [{
  label: 'Aktiva hemsidan',
  to: 'https://lintek.liu.se',
  target: '_blank'
}, {
  label: 'Kontakt',
  to: 'https://lintek.liu.se/kontakt/',
  target: '_blank'
}, {
  label: 'Om LinTek',
  to: 'https://lintek.liu.se/intro-till-karen/',
  target: '_blank'
}]
</script>

<template>
    <USeparator class="h-px" />

    <UFooter>
      <template #left>
        <p class="text-muted text-sm">
        © {{ new Date().getFullYear() }} LinTek
        <br/> Linköpings Teknologers Studentkår 
        <br/> Org.nr: 822001-0683
        </p>
      </template>

      <UNavigationMenu :items="items" variant="link" />

      <template #right>
        <NuxtLink to="https://www.lysator.liu.se/inhysningar/" class="flex items-center gap-2 mr-4">
            Inhyhsta hos <NuxtImg src="https://www.lysator.liu.se/images/logo.svg" alt="Lysator" width="64" />
        </NuxtLink>
        <UButton
          icon="i-simple-icons-instagram"
          color="neutral"
          variant="ghost"
          to="https://www.instagram.com/lintek_liu/?hl=en"
          target="_blank"
          aria-label="Instagram"
        />
        <UButton
          icon="i-simple-icons-facebook"
          color="neutral"
          variant="ghost"
          to="https://www.facebook.com/lintekvidliu"
          target="_blank"
          aria-label="Facebook"
        />
        <UButton
          icon="i-simple-icons-linkedin"
          color="neutral"
          variant="ghost"
          to="https://se.linkedin.com/company/lintek"
          target="_blank"
          aria-label="LinkedIn"
        />
      </template>
    </UFooter>
</template>
