<template>
    <v-content>
        <v-container>
            <v-row align="center" justify="center" style="display: flex; width: 100%;">
                <v-col style="flex: 3;">
                    <v-card align="center" justify="center" class="elevation-12">
                        <v-btn
                            class="mt-4"
                            v-if="show == false"
                            v-on:click="changeBtn"
                            rounded
                            color="info"
                        >{{titlebtn}}</v-btn>
                        <v-btn
                            class="mt-4"
                            v-if="show == true"
                            v-on:click="changeBtn"
                            rounded
                            color="error"
                        >{{titlebtn}}</v-btn>
                        <div class="text-xs-right">
                            <b>{{tabNote.length}}</b> Notes
                        </div>

                        <v-card-text>
                            <v-form v-if="show">
                                <v-text-field
                                    label="Titre"
                                    type="text"
                                    v-model="newTitle"
                                    counter
                                    maxlength="14"
                                    :rules="rules"
                                    clearable
                                />
                                <p
                                    v-if="newTitle"
                                    :class="[newTitle.length >= 4 ? 'border-success' : 'border-error']"
                                    id="tailleMax"
                                >Minimum 4 caractères</p>

                                <v-container fluid>
                                    <v-textarea
                                        counter
                                        label="Note"
                                        :rules="rules"
                                        :value="value"
                                        v-model="newNote"
                                    ></v-textarea>
                                </v-container>
                                <p
                                    v-if="newNote"
                                    :class="[newNote.length >= 4 ? 'border-success' : 'border-error']"
                                    id="tailleMax"
                                >Minimum 4 caractères</p>
                                <v-btn
                                    color="primary"
                                    v-on:click="addNote()"
                                    :disabled="newNote.length <= 4 || newTitle.length <=4"
                                >Ajouter</v-btn>
                            </v-form>
                        </v-card-text>

                        <v-snackbar v-model="snackbar">
                            <strong>{{ this.newTitle }}</strong> a été ajouté
                            <v-btn color="pink" @click="snackbar = false">fermer</v-btn>
                        </v-snackbar>

                        <v-row align="center" justify="center">
                            <div id="mesnotes" class="col-md-12">
                                <ul id="lesnotes" class="list-group">
                                    <h2>Mes notes</h2>
                                    <li
                                        v-for="(note, index) in tabNote"
                                        v-bind:id="'note_' + note.id"
                                        :key="index"
                                        class="list-group-item"
                                    >
                                        <div>
                                            <v-row
                                                id="titree"
                                                row="12"
                                                sm="8"
                                                md="4"
                                                align="center"
                                                justify="center"
                                            >
                                                <h2>{{ note.title }}</h2>
                                            </v-row>
                                            <div v-html="note.note" class="mt-8 mb-8 content"></div>
                                        </div>
                                        <v-btn
                                            v-on:click="deleteNote(note.id)"
                                            class="ma-2"
                                            color="red"
                                            dark
                                        >
                                            Supprimer
                                            <v-icon dark right>mdi-delete</v-icon>
                                        </v-btn>
                                        <v-btn
                                            v-on:click="modifyNote(note.id, note.note)"
                                            class
                                            size="1"
                                            id="modifier"
                                        >
                                            Modifier
                                            <v-icon dark right color="white">mdi-pencil</v-icon>
                                        </v-btn>
                                        <div>Ajouté le : {{note.timestamp}}</div>
                                        <v-container class="editorbutton">
                                            <v-btn
                                                v-on:click="disableEditorNote()"
                                                class="ma-2"
                                                color="red"
                                                dark
                                            >Annuler</v-btn>
                                            <v-btn
                                                v-on:click="saveNote()"
                                                color="green"
                                                dark
                                            >Enregister</v-btn>
                                        </v-container>
                                    </li>
                                </ul>
                            </div>
                        </v-row>
                        <v-snackbar v-model="snackbar2">
                            <strong>{{ this.newTitle }}</strong> a été supprimé
                            <v-btn color="pink" @click="snackbar2 = false">fermer</v-btn>
                        </v-snackbar>
                        <v-btn
                            :loading="loading"
                            :disabled="loading"
                            color="blue-grey"
                            class="ma-2 white--text"
                            @click="loader = 'loading'"
                        >
                            Télécharger en PDF
                            <v-icon right dark>mdi-cloud-upload</v-icon>
                        </v-btn>
                        <strong>Beta</strong>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-container></v-container>
    </v-content>
</template>

<script>
import { db } from '../firebase/index.js';

import Quill from 'quill';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import QuillNote from './QuillNote';

export default {
    name: 'Note',

    components: {
        QuillNote
    },
    data() {
        return {
            newNote: '',
            newTitle: '',
            tabNote: [],
            show: false,
            titlebtn: 'Ajouter une Note',
            max: 12,
            snackbar: false,
            snackbar2: false,
            indexSave: null,
            loader: null,
            loading: false
        };
    },

    beforeMount() {
        this.getNotes();
    },

    watch: {
        loader() {
            const l = this.loader;
            this[l] = !this[l];

            setTimeout(() => (this[l] = false), 3000);

            this.loader = null;
            this.creerPDF();
        }
    },

    methods: {
        saveNote() {
            var textmod = document.getElementsByClassName('ql-editor')[0]
                .innerHTML;

            document.querySelector(
                `#note_${this.indexSave} .content`
            ).innerHTML = textmod;
            db.collection('notes')
                .doc(this.indexSave)
                .update({
                    note: textmod
                });

            document.getElementById('editorrr').style.display = 'none';
            document.querySelector(
                `#note_${this.indexSave} .editorbutton`
            ).style.display = 'none';
            this.indexSave = null;
            textmod = null;
            this.getNotes();
        },

        creerPDF() {
            // let doc = new jsPDF();
            // console.log(document.getElementsByClassName('mesnotes'));

            // let tab = document.getElementsByClassName('mesnotes');

            // tab.forEach((value) => {
            //   doc.fromHTML(value.innerHTML,15,{
            //     "width":170
            //   })
            // })

            // // document.querySelector('.mesnotes').innerHTML,15,15,{
            // //     "width":170
            // //   }

            // doc.save("mesnotes.pdf");

            html2canvas(document.getElementById('mesnotes')).then(function(
                canvas
            ) {
                let img = canvas.toDataURL('image/png');
                let doc = new jsPDF('p', 'mm', 'a4');
                doc.addImage(img, 'JPEG', 0, 0);
                doc.save('mesnotes.pdf');
            });
        },

        dateFr() {
            // les noms de jours / mois
            var jours = new Array(
                'dimanche',
                'lundi',
                'mardi',
                'mercredi',
                'jeudi',
                'vendredi',
                'samedi'
            );
            var mois = new Array(
                'janvier',
                'fevrier',
                'mars',
                'avril',
                'mai',
                'juin',
                'juillet',
                'aout',
                'septembre',
                'octobre',
                'novembre',
                'decembre'
            );
            // on recupere la date
            var date = new Date();
            // on construit le message
            var message = jours[date.getDay()] + ' '; // nom du jour
            message += date.getDate() + ' '; // numero du jour
            message += mois[date.getMonth()] + ' '; // mois
            message += date.getFullYear();
            return message;
        },

        heure() {
            var date = new Date();
            var heure = date.getHours();
            var minutes = date.getMinutes();
            if (minutes < 10) minutes = '0' + minutes;
            return heure + 'h' + minutes;
        },

        datefretheure() {
            let message = this.dateFr() + ' ' + this.heure();
            return message;
        },

        getNotes() {
            let tabArray = [];
            let query = db
                .collection('notes')
                .where('userId', '==', this.$store.getters.getUserId);
            query.get().then(function(querySnapshot) {
                querySnapshot.forEach(doc => {
                    let note = doc.data();
                    note.id = doc.id;
                    tabArray.push(note);
                });
            });
            this.tabNote = tabArray.sort((a, b) => b.timestamp - a.timestamp);
        },
        addNote() {
            this.$store.dispatch('addNote', {
                title: this.newTitle,
                note: this.newNote,
                userId: this.$store.getters.getUserId,
                timestamp: this.datefretheure()
            });

            this.newNote = '';

            this.show = false;
            this.titlebtn = 'Ajouter une Note';
            this.snackbar = true;
            this.getNotes();
        },

        /*addNote(){

      this.tabNote.push({ id: Date.now(), nameTitle: this.newTitle, textNote: this.newNote })
      this.newNote = ""
      
      this.show = false
      this.titlebtn = 'Ajouter une Note'
      this.snackbar = true
      

    },*/

        deleteNote(index) {
            db.collection('notes')
                .doc(index)
                .delete();

            this.getNotes();
            this.snackbar2 = true;
            document.getElementById('editorrr').style.display = 'none';
        },

        /*removeNote(index) {
                    this.tabNote.splice(index, 1);
              },*/
        changeBtn() {
            this.show = !this.show;
            if (this.titlebtn == 'Ajouter une Note') {
                this.titlebtn = 'Annuler';
            } else {
                this.titlebtn = 'Ajouter une Note';
            }
            this.newTitle = '';
        },

        modifyNote(index, textNote) {
            this.indexSave = index;
            document.getElementById('editorrr').style.display = 'block';

            document.getElementsByClassName(
                'ql-editor'
            )[0].innerHTML = textNote;

            document.querySelector(
                `#note_${this.indexSave} .editorbutton`
            ).style.display = 'block';
        },
        disableEditorNote() {
            document.getElementById('editorrr').style.display = 'none';
            document.querySelector(
                `#note_${this.indexSave} .editorbutton`
            ).style.display = 'none';
        }
    }
};
</script>



<style scoped>
#editorrr {
    display: none;
}

.titleApp {
    text-align: center !important;
}

#modifier {
    background-color: #007bff;
    color: white;
}
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}

.editorbutton {
    display: none;
}

.border-error {
    color: red;
}

.border-success {
    color: green;
}

#tailleMax:focus {
    outline: none;
}
#lesnotes {
    border: 1px solid rgba(0, 0, 0, 0.125);
}
@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@-o-keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
@keyframes loader {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
