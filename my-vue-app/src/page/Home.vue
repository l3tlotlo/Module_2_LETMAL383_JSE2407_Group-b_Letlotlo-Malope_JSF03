<template>
    <div>
      <ProductList @select-product="selectProduct" />
      <Login v-if="showLogin" @login="handleLogin" @cancel="showLogin = false" />
    </div>
  </template>
  

