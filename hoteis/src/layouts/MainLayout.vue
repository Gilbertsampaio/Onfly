<template>
  <q-layout>
    <q-header class="header-div">
      <q-toolbar class="flex flex-center">
        <q-toolbar-title class="flex flex-center">
          <q-img class="header-div__logo"
            src="../assets/onfly-logo.svg"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container class="page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>