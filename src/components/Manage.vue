<template>
  <Navbar />
  <div class="manage">
    <h1>Database Management</h1>
    <!--Selection de la table-->
    <div class="search">
      <select v-model="table" required>
        <option value="annonce">Annonces</option>
        <option value="utilisateur">Utilisateurs</option>
        <option value="entreprise">Entreprises</option>
        <option value="message">Messages</option>
      </select>
      <button @click="getData">Search</button>
    </div>
    <!--Affichage de la table-->
    <div class="table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th v-if="table == 'annonce'">Localisation</th>
            <th v-if="table == 'annonce'">Poste</th>
            <th v-if="table == 'annonce'">Horraires</th>
            <th v-if="table == 'annonce'">Commentaire</th>
            <th v-if="table == 'annonce'">ID_Entreprise</th>

            <th v-if="table == 'entreprise'">Nom</th>
            <th v-if="table == 'entreprise'">Localisation</th>
            <th v-if="table == 'entreprise'">Email</th>
            <th v-if="table == 'entreprise'">Login</th>
            <th v-if="table == 'entreprise'">Mdp</th>

            <th v-if="table == 'utilisateur'">Nom</th>
            <th v-if="table == 'utilisateur'">Prenom</th>
            <th v-if="table == 'utilisateur'">Email</th>
            <th v-if="table == 'utilisateur'">Login</th>
            <th v-if="table == 'utilisateur'">Mdp</th>
            <th v-if="table == 'utilisateur'">Rôle</th>

            <th v-if="table == 'message'">Contenue</th>
            <th v-if="table == 'message'">ID_Annonce</th>
            <th v-if="table == 'message'">ID_Utilisateur</th>

            <th colspan="3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="table == 'annonce'" v-for="annonce in annonces">
            <td>{{ annonce.id }}</td>
            <td>{{ annonce.localisation }}</td>
            <td>{{ annonce.poste }}</td>
            <td>{{ annonce.horraires }}</td>
            <td>{{ annonce.commentaire }}</td>
            <td>{{ annonce.entreprise.id }}</td>
            <td><button @click="editing">Update</button></td>
            <td><button @click="deleting">Delete</button></td>
            <td><button @click="creating">Create</button></td>
          </tr>

          <tr v-if="table == 'entreprise'" v-for="entreprise in entreprises">
            <td>{{ entreprise.id }}</td>
            <td>{{ entreprise.nom }}</td>
            <td>{{ entreprise.localisation }}</td>
            <td>{{ entreprise.email }}</td>
            <td>{{ entreprise.login }}</td>
            <td>{{ entreprise.mdp }}</td>
            <td><button @click="editing">Update</button></td>
            <td><button @click="deleting">Delete</button></td>
            <td><button @click="creating">Create</button></td>
          </tr>

          <tr v-if="table == 'utilisateur'" v-for="utilisateur in utilisateurs">
            <td>{{ utilisateur.id }}</td>
            <td>{{ utilisateur.nom }}</td>
            <td>{{ utilisateur.prenom }}</td>
            <td>{{ utilisateur.email }}</td>
            <td>{{ utilisateur.login }}</td>
            <td>{{ utilisateur.mdp }}</td>
            <td>{{ utilisateur.role }}</td>
            <td><button @click="editing">Update</button></td>
            <td><button @click="deleting">Delete</button></td>
            <td><button @click="creating">Create</button></td>
          </tr>

          <tr v-if="table == 'message'" v-for="message in messages">
            <td>{{ message.id }}</td>
            <td>{{ message.contenue }}</td>
            <td>{{ message.annonce.id }}</td>
            <td>{{ message.utilisateur.id }}</td>
            <td><button @click="editing">Update</button></td>
            <td><button @click="deleting">Delete</button></td>
            <td><button @click="creating">Create</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="add">
      <!--Ajout d'une ligne-->

      <form v-if="edit == false && del == false" @submit.prevent="addData">
        <label v-if="table == 'annonce'">Add Annonce</label>
        <label v-if="table == 'entreprise'">Add Entreprise</label>
        <label v-if="table == 'utilisateur'">Add Utilisateur</label>
        <label v-if="table == 'message'">Add Message</label>
        <div v-if="table == 'annonce'">
          <input
            type="text"
            name="localisation"
            placeholder="Localisation"
            required
            v-model="add.annonce.localisation"
          />
          <input
            type="text"
            name="poste"
            placeholder="Poste"
            required
            v-model="add.annonce.poste"
          />
          <input
            type="text"
            name="horraires"
            placeholder="Horraires"
            required
            v-model="add.annonce.horraires"
          />
          <input
            type="text"
            name="commentaire"
            placeholder="Commentaire"
            required
            v-model="add.annonce.commentaire"
          />
          <input
            type="number"
            min="1"
            name="id_entreprise"
            placeholder="Id Entreprise"
            required
            v-model="add.annonce.Id_Entreprise"
          />
        </div>

        <div v-if="table == 'entreprise'">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            required
            v-model="add.entreprise.nom"
          />
          <input
            type="text"
            name="localisation"
            placeholder="Localisation"
            required
            v-model="add.entreprise.localisation"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            v-model="add.entreprise.email"
          />
          <input
            type="text"
            name="login"
            placeholder="Login"
            required
            v-model="add.entreprise.login"
          />
          <input
            type="password"
            name="mdp"
            placeholder="Password"
            required
            v-model="add.entreprise.mdp"
          />
        </div>

        <div v-if="table == 'utilisateur'">
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            required
            v-model="add.utilisateur.nom"
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prenom"
            required
            v-model="add.utilisateur.prenom"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            v-model="add.utilisateur.email"
          />
          <input
            type="text"
            name="login"
            placeholder="Login"
            required
            v-model="add.utilisateur.login"
          />
          <input
            type="password"
            name="mdp"
            placeholder="Password"
            required
            v-model="add.utilisateur.mdp"
          />
        </div>

        <div v-if="table == 'message'">
          <input
            type="text"
            name="contenue"
            placeholder="Contenue"
            required
            v-model="add.message.contenu"
          />
          <input
            type="number"
            min="1"
            name="id_annonce"
            placeholder="Id Annonce"
            required
            v-model="add.message.idAnnonce"
          />
          <input
            type="number"
            min="1"
            name="id_utilisateur"
            placeholder="Id Utilisateur"
            required
            v-model="add.message.idUtilisateur"
          />
        </div>
        <button class="submit">Submit</button>
      </form>

      <form v-if="edit == true && del == false" @submit.prevent="updateData">
        <label v-if="table == 'annonce'">Edit Annonce</label>
        <label v-if="table == 'entreprise'">Edit Entreprise</label>
        <label v-if="table == 'utilisateur'">Edit Utilisateur</label>
        <label v-if="table == 'message'">Edit Message</label>

        <div v-if="table == 'annonce'">
          <input
            type="number"
            min="1"
            name="id"
            placeholder="Id"
            required
            v-model="add.annonce.id"
          />
          <input
            type="text"
            name="localisation"
            placeholder="Localisation"
            required
            v-model="add.annonce.localisation"
          />
          <input
            type="text"
            name="poste"
            placeholder="Poste"
            required
            v-model="add.annonce.poste"
          />
          <input
            type="text"
            name="horraires"
            placeholder="Horraires"
            required
            v-model="add.annonce.horraires"
          />
          <input
            type="text"
            name="commentaire"
            placeholder="Commentaire"
            required
            v-model="add.annonce.commentaire"
          />
          <input
            type="number"
            min="1"
            name="id_entreprise"
            placeholder="Id Entreprise"
            required
            v-model="add.annonce.Id_Entreprise"
          />
        </div>

        <div v-if="table == 'entreprise'">
          <input
            type="number"
            min="1"
            name="id"
            placeholder="Id"
            required
            v-model="add.entreprise.id"
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            required
            v-model="add.entreprise.nom"
          />
          <input
            type="text"
            name="localisation"
            placeholder="Localisation"
            required
            v-model="add.entreprise.localisation"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            v-model="add.entreprise.email"
          />
          <input
            type="text"
            name="login"
            placeholder="Login"
            required
            v-model="add.entreprise.login"
          />
          <input
            type="password"
            name="mdp"
            placeholder="Password"
            required
            v-model="add.entreprise.mdp"
          />
        </div>

        <div v-if="table == 'utilisateur'">
          <input
            type="number"
            min="1"
            name="id"
            placeholder="Id"
            required
            v-model="add.utilisateur.id"
          />
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            required
            v-model="add.utilisateur.nom"
          />
          <input
            type="text"
            name="prenom"
            placeholder="Prenom"
            required
            v-model="add.utilisateur.prenom"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            v-model="add.utilisateur.email"
          />
          <input
            type="text"
            name="login"
            placeholder="Login"
            required
            v-model="add.utilisateur.login"
          />
          <input
            type="password"
            name="mdp"
            placeholder="Password"
            required
            v-model="add.utilisateur.mdp"
          />
        </div>

        <div v-if="table == 'message'">
          <input
            type="number"
            min="1"
            name="id"
            placeholder="Id"
            required
            v-model="add.message.id"
          />
          <input
            type="text"
            name="contenue"
            placeholder="Contenue"
            required
            v-model="add.message.contenu"
          />
        </div>
        <button class="submit">Submit</button>
      </form>

      <form v-if="edit == false && del == true" @submit.prevent="deleteData">
        <label v-if="table == 'annonce'">Delete Annonce</label>
        <label v-if="table == 'entreprise'">Delete Entreprise</label>
        <label v-if="table == 'utilisateur'">Delete Utilisateur</label>
        <label v-if="table == 'message'">Delete Message</label>

        <div v-if="table == 'annonce'">
          <input
            type="number"
            min="1"
            name="id"
            placeholder="Id"
            required
            v-model="add.annonce.id"
          />
        </div>

        <div v-if="table == 'entreprise'">
          <input
            type="number"
            min="1"
            name="id"
            placeholder="Id"
            required
            v-model="add.entreprise.id"
          />
        </div>

        <div v-if="table == 'utilisateur'">
          <input
            type="number"
            min="1"
            name="id"
            placeholder="Id"
            required
            v-model="add.utilisateur.id"
          />
        </div>

        <div v-if="table == 'message'">
          <input
            type="number"
            min="1"
            name="id"
            placeholder="Id"
            required
            v-model="add.message.id"
          />
        </div>
        <button class="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import axios from "axios";
export default {
  name: "Manage",
  components: { Navbar },
  data() {
    return {
      table: "annonce",

      annonces: [],
      entreprises: [],
      utilisateurs: [],
      messages: [],

      edit: false,
      del: false,

      add: {
        annonce: {
          id: "",
          localisation: "",
          poste: "",
          horraires: "",
          commentaire: "",
          Id_Entreprise: "",
        },
        entreprise: {
          id: "",
          nom: "",
          localisation: "",
          email: "",
          login: "",
          mdp: "",
        },
        utilisateur: {
          id: "",
          nom: "",
          prenom: "",
          email: "",
          login: "",
          mdp: "",
          role: "user",
        },
        message: {
          id: "",
          contenu: "",
          idAnnonce: "",
          idUtilisateur: "",
        },
      },
    };
  },
  methods: {
    getData() {
      axios.get("http://localhost:3000/annonces").then((response) => {
        this.annonces = response.data;
      });

      axios.get("http://localhost:3000/entreprises").then((response) => {
        this.entreprises = response.data;
      });

      axios.get("http://localhost:3000/utilisateurs").then((response) => {
        this.utilisateurs = response.data;
      });

      axios.get("http://localhost:3000/messages").then((response) => {
        this.messages = response.data;
      });
    },
    addData() {
      switch (this.table) {
        case "annonce":
          axios
            .post("http://localhost:3000/annonces", this.add.annonce)
            .then(() => {
              alert("Annonce ajoutée");
            });
          break;

        case "entreprise":
          axios
            .post("http://localhost:3000/entreprises", this.add.entreprise)
            .then(() => {
              alert("Entreprise ajoutée");
            });
          break;

        case "utilisateur":
          axios
            .post("http://localhost:3000/utilisateurs", this.add.utilisateur)
            .then(() => {
              alert("Utilisateur ajouté");
            });
          break;

        case "message":
          console.log(this.add.message);
          axios
            .post("http://localhost:3000/messages", this.add.message)
            .then(() => {
              alert("Message ajouté");
            });
          break;

        default:
          alert("Erreur");
          break;
      }
    },
    updateData(){
      switch(this.table) {
        case "annonce":
          axios.put("http://localhost:3000/annonces/" + this.add.annonce.id, this.add.annonce).then(() => {
            alert("Annonce modifiée");
          });
          break;

        case "entreprise":
          axios.put("http://localhost:3000/entreprises/" + this.add.entreprise.id, this.add.entreprise).then(() => {
            alert("Entreprise modifiée");
          });
          break;

        case "utilisateur":
          axios.put("http://localhost:3000/utilisateurs/" + this.add.utilisateur.id, this.add.utilisateur).then(() => {
            alert("Utilisateur modifié");
          });
          break;

        case "message":
          axios.put("http://localhost:3000/messages/" + this.add.message.id, this.add.message).then(() => {
            alert("Message modifié");
          });
          break;
      }
    },
    deleteData(){
      switch (this.table) {
        case "annonce":
          axios.delete("http://localhost:3000/annonces/" + this.add.annonce.id).then(() => {
            alert("Annonce supprimée");
          });
          break;
        
        case "entreprise":
          axios.delete("http://localhost:3000/entreprises/" + this.add.entreprise.id).then(() => {
            alert("Entreprise supprimée");
          });
          break;

        case "utilisateur":
          axios.delete("http://localhost:3000/utilisateurs/" + this.add.utilisateur.id).then(() => {
            alert("Utilisateur supprimé");
          });
          break;
        
        case "message":
          axios.delete("http://localhost:3000/messages/" + this.add.message.id).then(() => {
            alert("Message supprimé");
          });
          break;
      }
    },
    editing() {
      this.edit = true;
      this.del = false;
    },
    deleting() {
      this.del = true;
      this.edit = false;
    },
    creating() {
      this.del = false;
      this.edit = false;
    },
  },
};
</script>

<style scoped src="../css/manage.css" />
