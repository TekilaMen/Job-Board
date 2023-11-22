<template>
  <Navbar />
  <div class="container">
    <div class="title">
      <h1>Job Board</h1>
    </div>

    <div class="cards-group">
      <div class="card" v-for="card in cards">
        <a>
          <div class="card-image">
            <div class="card-image-title">
              <h5>{{ card.entreprise.nom }}</h5>
              <h4>{{ card.localisation }}</h4>
            </div>
          </div>
        </a>
        <div class="card-description">
          <h5>{{ card.poste }}</h5>
          <h4>{{ card.horraires }}</h4>
          <p>
            {{ card.commentaire }}
          </p>
        </div>
        <a @click="showPopup = true">
          <div class="card-icons"></div>
        </a>
      </div>
    </div>
  </div>

  <div class="popup" v-if="showPopup">
    <div v-if="$store.state.loggedInUser == true" class="popup-content">
      <form @submit.prevent="onAddPost">
        <h2>Popup Form</h2>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" v-bind:value="user.nom"/><br /><br />
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" v-bind:value="user.email"/><br /><br />
        <label for="annonce">Annonce:</label>
        <select id="annonce" v-model="posts.idAnnonce" required>
          <option value="">-- Please choose an option --</option>
          <option  v-for="card in cards" v-bind:value="card.id">{{ card.poste }} | {{ card.entreprise.nom }}</option>
        </select>
        <br /><br />
        <label for="message">Message:</label>
        <textarea id="message" name="message" v-model="posts.contenu"></textarea
        ><br /><br />
        <button id="button">Submit</button>
        <button id="button" @click="showPopup = false">Close</button>
      </form>
    </div>
    <div v-if="$store.state.loggedInUser != true" class="popup-content">
      <form @submit.prevent="onAddPost">
        <h2>Popup Form</h2>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name"/><br /><br />
        <label for="email">Email:</label>
        <input type="email" id="email" name="email"/><br /><br />
        <label for="annonce">Annonce:</label>
        <select id="annonce" v-model="posts.idAnnonce" required>
          <option value="">-- Please choose an option --</option>
          <option  v-for="card in cards" v-bind:value="card.id">{{ card.poste }} | {{ card.entreprise.nom }}</option>
        </select>
        <br /><br />
        <label for="message">Message:</label>
        <textarea id="message" name="message" v-model="posts.contenu"></textarea
        ><br /><br />
        <button id="button">Submit</button>
        <button id="button" @click="showPopup = false">Close</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "./Navbar.vue";
import store from "../store/index.js";
export default {
  name: "Home",
  components: { Navbar },
  data() {
    return {
      posts: {
        idAnnonce: "",
        contenu: "",
        idUtilisateur: 1, // Guest
      },

      user: [],

      showPopup: false,

      cards: [],
    };
  },
  mounted() {
    axios.get("http://localhost:3000/annonces").then((response) => {
      this.cards = response.data;
    });

    console.log(store.state.acessToken);

    if(store.state.loggedInUser != false) {
      axios.get("http://localhost:3000/utilisateurs/" + store.state.idLogged + "/all").then((response) => {
      this.user = response.data;
    });
    }
  },
  methods: {
    onAddPost() {
      axios.post("http://localhost:3000/messages", this.posts).then(() => {
        alert("Message envoyé");
      });
      this.showPopup = false;
    },
  },
};
</script>

<style scoped src="../css/home.css" />
