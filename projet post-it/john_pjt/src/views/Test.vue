<script setup>
import { ref } from 'vue';

    var random_margin = ["-5px", "1px", "5px", "10px", "7px"];
    var random_colors = ["#c2ff3d","#ff3de8","#3dc2ff","#04e022","#bc83e6","#ebb328","#fa8072","#e1ad01","#d3d3d3","#90ee90"];
    var random_degree = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];
    // var index = 0;
    // let copy = null

    //window.onload = document.querySelector("#user_input").select();
    function Add_Note() {
      document.querySelector("#modal").style.display = "block";

    }
    function hide() {
      document.querySelector("#modal").style.display = "none";
    }
  

    // let createStickyNote = (text,title) => {
    //   let note = document.createElement("div");
    //   // let autres = document.createElement("div")
    //   let details = document.createElement("div");
    //   let noteText = document.createElement("h1");
    //   let titlteText = document.createElement("h3")


    //   note.className = "note";
    //   details.className = "details";
    //   noteText.textContent = text;
    //   titlteText.textContent = title;
    

    //   details.appendChild(titlteText);
    //   details.appendChild(noteText);
    //   note.appendChild(details);

    //   if(index > random_colors.length - 1)
    //     index = 0;

    //   note.setAttribute("style", `margin:${random_margin[Math.floor(Math.random() * random_margin.length)]}; background-color:${random_colors[index++]}; transform:${random_degree[Math.floor(Math.random() * random_degree.length)]}`);

      
    //   note.addEventListener("mouseenter", function(){
    //     note.style.transform = "scale(1.1)";
    //   })
    //   note.addEventListener("mouseleave", function(){
    //     note.style.transform = "scale(1)";
    //   })
    //     // supprimer mes post-it
    //   note.addEventListener("dblclick", () => {
    //     note.remove();
    //   })

    //   document.querySelector("#all_notes").appendChild(note);
    // }
    
    function user_input(event) {
      if(event.key === 'Enter'){
  
        const text = document.querySelector("#user_input");
        const title = document.querySelector("#title");
        // createStickyNote(text.value,title.value);
        fetch("http://62.72.5.95:1999/notes",{
          method : 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
             title: title.value,
             content : [text.value]
             })
        })
        .then(response => response.json())
        .then(data =>{
           products.value = data.notes
           
          });
        text.value = "";
        title.value = "";
      }

      const products = ref(null)
      fetch("http://62.72.5.95:1999/notes")
      .then(response => response.json())
      .then(data => products.value = data.notes);
    }
  
   
    function notedelete(event) {
      console.log(event)
      fetch(`http://62.72.5.95:1999/notes/${event}`,{
          method : 'DELETE', 
        })
      .then(response => response.json())
      .then(data => console.log(data));

      // window.location.reload();
      
    }
    
    const products = ref(null)
  
    fetch("http://62.72.5.95:1999/notes")
    .then(response => response.json())
    .then(data =>{
       products.value = data.notes
      })
    
    function refresh() {
      setInterval(() => {
        fetch("http://62.72.5.95:1999/notes")
    .then(response => response.json())
    .then(data =>{
       products.value = data.notes
      })
      }, 1000);
    }
  refresh()  
</script>
    
<template>

  <div id="modal">

      <div id="inner_modal">
          <input type="text" placeholder="title" @keyup.enter="title" id="title">
          <textarea placeholder="Write note..." @keyup.enter="user_input" id="user_input" maxlength="150"></textarea>
          <i class="fa-solid fa-circle-xmark" @click="hide"></i>
      </div>

  </div>
  
  <main>

    <header>
      <div class="container">
        <div id="header">
          <h1><i class="fas fa-sticky-note"></i> Sticky Notes</h1>
          <button @click="Add_Note">ADD NOTE</button>
        </div>
      </div>
    </header>
    
    <section>
      <div class="container">
        <div id="all_notes">
          <div v-for="items in products" :key="items._id">
            <router-link :to="{ name: 'detail_vue', params: {id:items._id}}">
              <div class="note" :style="'; background-color:'+random_colors[Math.floor(Math.random() * random_colors.length)]+'; transform:'+random_degree[Math.floor(Math.random() * random_degree.length)]">
              <div class="details">
                <h3>{{ items.title }}</h3>
                <h1>{{ items.content[0] }}</h1>
                </div>
                </div>
                </router-link>
              <i class="fa-solid fa-circle-xmark" @click="notedelete(items._id)"></i>
          </div>
        </div>
      </div>
    </section>

  </main>
  
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Satisfy&display=swap');

*{
  padding: 0;
  margin: 0;
}

body{
  /* border: 1px solid red ;
  position: absolute; */
  background-image:  url("bois.jpeg");
  background-repeat : no-repeat;
  background-size:cover;
  background-attachment:fixed;
  font-family:  'pacifico';
  /* font-family: 'Architects Daughter', cursive; */
}
input{
  padding-left: 7%;
}
textarea{
  padding-left: 2%;
}
button{
  padding: 8px;
  outline: none;
  cursor: pointer;
  font-family: inherit;
  border-radius: 5px;
  background: whitesmoke;
  border: 1px solid lightgray;
  
}

button:hover{
  color: white;
  background-color: rgba(0, 0, 0, 0.1);
}

#modal{
  position: fixed;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}

input{
  width: 276px;
  outline:none;
  border:none;
  
}

#inner_modal{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

#inner_modal textarea{
  border:none;
  width: 276px;
  height: 276px;
  padding: 25px;
  outline: none;
  resize: none;
  font-size: 1.5rem;
  font-family:  Pacifico;
  /* font-family: inherit; */
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.9);
  
}

#inner_modal i{
  font-size: 1.4rem;
  color: grey;
  cursor: pointer;
  margin-top: -0px;
  margin-left: -290px;
  transition: 1s ease-in-out;
}

#inner_modal i:hover{
  color: lightgray;
}
#all_notes i{
  color: white;
}
#all_notes i:hover{
  color: lightgray;
}

/* .note:hover{
  transition: 0.5s;
  transform: scale(1.2s);
} */


.container{
  width: 1280px;
  margin: auto;
}

#header{
  color: white;
  padding: 0 20px;
  min-height: 70px;
  text-shadow: 1px 1px black;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.fas{
  color: #c2ff3d;
}

#all_notes{
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 10px;
}
a{
  text-decoration: none;
  color: #000;
}

.note{
  width:250px;
  height: 250px;
  transition: 0.5s;
  cursor: pointer;
  overflow-wrap: break-word;
  box-shadow: 0px 10px 24px 0px rgba(0,0,0,0.75);
  transform : scale(1.s) 
}


.note h1{
  font-size: 1.3rem;
}
.note h3{
  font-size: 1.6rem;
}


#title{
  font-family:  Pacifico;
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  padding-left: 5px;
  
}

.details {
  margin-top: 25px;
  padding: 0 15px;
  font-size: 1.5rem;
  
}

.details i{
  color: whitesmoke;
  cursor: pointer;
  text-shadow: 1px 1px #BBB;
}

@media(max-width:1280px){
  .container{
    width: 100%;
  }
}

@media(max-width:768px){
  #header{
    padding: 20px;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
