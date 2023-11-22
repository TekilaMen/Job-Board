<template>
  <Navbar />
  <div class="container">
    <div class="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <!-- Create -->
      <div class="signup">
        <form @submit.prevent="create">
          <label for="chk" aria-hidden="true">Sign up</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required=""
            v-model="signup.nom"
          />
          <input
            type="text"
            name="forname"
            placeholder="Forname"
            required=""
            v-model="signup.prenom"
            v-if="signup.role == 'user'"
          />
          <input
            type="text"
            name="localisation"
            placeholder="Localisation"
            required=""
            v-model="signup.localisation"
            v-if="signup.role == 'entreprise'"
          />
          <input
            type="text"
            name="txt"
            placeholder="Login"
            required=""
            v-model="signup.login"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required=""
            v-model="signup.email"
          />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            required=""
            v-model="signup.mdp"
          />
          <select v-model="signup.role" required>
            <option value="user">Utilisateur</option>
            <option value="entreprise">Entreprise</option>
          </select>
          <button>Sign up</button>
        </form>
      </div>

      <!-- Login -->
      <div class="login">
        <form @submit.prevent="login">
          <label for="chk" aria-hidden="true">Login</label>
          <input
            type="text"
            name="txt"
            placeholder="Login"
            required=""
            v-model="verif.username"
          />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            required=""
            v-model="verif.password"
          />
          <button>Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
import store from "../store/index.js";
export default {
  name: "Login",
  components: { Navbar },
  data() {
    return {
      verif: {
        username: "",
        password: "",
      },
      signup: {
        nom: "",
        prenom: "",
        localisation: "",
        email: "",
        login: "",
        mdp: "",
        role: "user",
      },
    };
  },
  methods: {
    /*
    login() {
      axios
        .get("http://localhost:3000/utilisateurs/" + this.verif.login)
        .then((response) => {
          this.user = response.data;
          if (
            this.user.mdp == this.verif.mdp &&
            this.user.login == this.verif.login
          ) {
            store.commit("loginUser");
            store.commit('idLogged', this.user.id)
            store.commit('roleLogged', this.user.role)
            this.$router.push("/");
          } else {
            axios
              .get("http://localhost:3000/entreprises/" + this.verif.login)
              .catch((error) => {
                alert("Login incorrect");
              })
              .then((response) => {
                this.entreprise = response.data;
                if (
                  this.entreprise.mdp == this.verif.mdp &&
                  this.entreprise.login == this.verif.login
                ) {
                  store.commit("loginEntreprise");
                  store.commit('idLogged', this.entreprise.id)
                  this.$router.push("/");
                } else {
                  alert("Mot de passe incorrect");
                }
              });
          }
        });
    }, */
    login() {
      axios
        .post("http://localhost:3000/auth/login/user", this.verif)
        .then((response) => {
          store.commit("getAcessToken", response.data);
          if (store.state.acessToken != null) {
            store.commit("loginUser");
          }

          if (store.state.loggedInUser == true) {
            axios
              .get("http://localhost:3000/Utilisateurs/" + this.verif.username)
              .then((response) => {
                store.commit("idLogged", response.data.id);
                store.commit("roleLogged", response.data.role);
                this.$router.push("/");
              });
          }
        });

      axios
        .post("http://localhost:3000/auth/login/entreprise", this.verif)
        .then((response) => {
          store.commit("getAcessToken", response.data);
          if (store.state.acessToken != null) {
            store.commit("loginEntreprise");
          }

          if (store.state.loggedInEntreprise == true) {
            axios
              .get("http://localhost:3000/Entreprises/" + this.verif.username)
              .then((response) => {
                store.commit("idLogged", response.data.id);
                this.$router.push("/");
              });
          }
        });
    },

    create() {
      if (this.signup.role == "user") {
        axios
          .post("http://localhost:3000/Utilisateurs", this.signup)
          .then(() => {
            alert("Inscription réussie");
          });
      } else if (this.signup.role == "entreprise") {
        axios
          .post("http://localhost:3000/Entreprises", this.signup)
          .then(() => {
            alert("Inscription réussie");
          });
      } else {
        alert("Erreur");
      }
    },
  },
};
</script>

<style scoped src="../css/login.css" />
