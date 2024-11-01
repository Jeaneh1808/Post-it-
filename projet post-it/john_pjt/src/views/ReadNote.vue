<script>
export default {
  data() {
    return {
      note: {
        title: "",
        content: []
      },
      id: this.$route.params.id,
      showModal: false // Variable pour contrôler l'affichage du modal
    };
  },
  mounted() {
    fetch("http://62.72.5.95:1999/notes/" + this.id)
      .then((response) => response.json())
      .then((data) => {
        this.note = data;
      });
  },
  methods: {
    enregistrer() {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: this.note.title,
          content: [this.note.content]
        })
      };
      fetch("http://62.72.5.95:1999/notes/" + this.id, requestOptions)
        .then((response) => response.json())
        .then((data) => (this.updatedAt = data.updatedAt));

      this.$router.push("/");
      this.showModal = false; // Fermer le modal après l'enregistrement
    },
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    }
  }
};
</script>

<template>
  <header>
    <div class="container">
      <div id="header">
        <h1><i class="fas fa-sticky-note"></i> Sticky Notes</h1>
        <!-- Bouton pour ouvrir le modal -->
        <button @click="openModal">Modifier la Note</button>
      </div>
    </div>
  </header>

  <!-- Modal -->
  <div v-if="showModal" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2>Modifier la Note</h2>
      <input
        type="text"
        v-model="note.title"
        @keyup.enter="enregistrer"
        placeholder="Titre de la note"
      />
      <textarea
        v-model="note.content"
        @keyup.enter="enregistrer"
        placeholder="Contenu de la note"
      ></textarea>
      <div class="modal-buttons">
        <button @click="enregistrer" class="save-btn">Enregistrer</button>
        <button @click="closeModal" class="close-btn">Fermer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles pour le modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  width: 80%;
  max-width: 500px;
  margin-top: 50px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 10px 24px rgba(0, 0, 0, 0.75);
  transform: translateY(-100%);
  animation: slideDown 0.5s forwards;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

/* Style des boutons dans le modal */
.modal-buttons {
  display: flex;
  justify-content: space-between; /* Les boutons seront placés de part et d'autre */
  margin-top: 20px;
}

.save-btn {
  background-color: #04e022;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.save-btn:hover {
  background-color: #03b818;
}

.close-btn {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.close-btn:hover {
  background-color: darkred;
}

input,
textarea {
  width: 100%;
  margin-bottom: 1rem;
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ced4da;
}

button {
  font-size: 1rem;
}
</style>
