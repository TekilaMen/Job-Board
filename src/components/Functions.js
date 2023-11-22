import axios from "axios";

// Functions for Entreprises

export function getNomEntrepriseById(id) {
  return axios
    .get("http://localhost:3000/Entreprises/" + id + "/nom")
    .then((response) => {
      return response.data;
    });
}

export function getLocaEntrepriseById(id) {
  return axios
    .get("http://localhost:3000/Entreprises/" + id + "/localisation")
    .then((response) => {
      return response.data;
    });
}

export function getMailEntrepriseById(id) {
  return axios
    .get("http://localhost:3000/Entreprises/" + id + "/email")
    .then((response) => {
      return response.data;
    });
}

export function getLoginEntrepriseById(id) {
  return axios
    .get("http://localhost:3000/Entreprises/" + id + "login")
    .then((response) => {
      return response.data;
    });
}

export function getMdpEntrepriseById(id) {
  return axios
    .get("http://localhost:3000/Entreprises/" + id + "/mdp")
    .then((response) => {
      return response.data;
    });
}

// Functions for Announces

export function getLocaAnnonceById(id) {
  return axios
    .get("http://localhost:3000/Annonces/" + id + "/localisation")
    .then((response) => {
      return response.data;
    });
}

export function getPosteAnnonceById(id) {
  return axios
    .get("http://localhost:3000/Annonces/" + id + "/poste")
    .then((response) => {
      return response.data;
    });
}

export function getCommAnnonceById(id) {
  return axios
    .get("http://localhost:3000/Annonces/" + id + "/commentaire")
    .then((response) => {
      return response.data;
    });
}

export function getHorrairesAnnonceById(id) {
  return axios
    .get("http://localhost:3000/Annonces/" + id + "/horraires")
    .then((response) => {
      return response.data;
    });
}

export function getEntrepriseAnnonceById(id) {
  return axios
    .get("http://localhost:3000/Annonces/" + id + "/entreprise")
    .then((response) => {
      return response.data;
    });
}

// Functions for Users & Entreprises