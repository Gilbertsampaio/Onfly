<template>
  <q-layout>
    <q-header>
      <q-toolbar class="flex flex-center">
        <q-toolbar-title class="flex flex-center">
          <q-img class="q-img-logo"
            src="../assets/onfly-logo.svg"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>