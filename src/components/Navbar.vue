<template>
  <nav>
    <!-- Accueil -->
    <router-link id="home" to="/">
      <img src="../../Ressources/SVG/home.svg" width="30" height="30" />
    </router-link>
    <div class="navRight">
      <router-link class="navbutton" to="/manage" v-if="$store.state.roleLogged == 'admin' && $store.state.acessToken != null">
        <img src="../../Ressources/SVG/manage.svg" width="30" height="30" />
      </router-link>
      <router-link class="navbutton" to="/mailbox" v-if="$store.state.loggedInEntreprise && $store.state.acessToken != null">
        <img src="../../Ressources/SVG/message.svg" width="30" height="30" />
      </router-link>
      <router-link class="navbutton" to="/" v-if="$store.state.loggedInUser && $store.state.acessToken != null || $store.state.loggedInEntreprise && $store.state.acessToken != null" @click.prevent="logout">
        <img src="../../Ressources/SVG/logout.svg" width="30" height="30" />
      </router-link>
      <router-link class="navbutton" to="/login" v-if="!$store.state.loggedInUser && !$store.state.loggedInEntreprise && $store.state.acessToken == null">
        <img src="../../Ressources/SVG/login.svg" width="30" height="30" />
      </router-link>
    </div>
  </nav>
</template>

<script>
import store from "../store/index.js";
export default {
  name: "Navbar",
  methods: {
    logout() {
      store.commit("logout");
    },
  },
};
</script>

<style scoped src="../css/navbar.css" />
