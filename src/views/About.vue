<template>
    <v-container>
        <v-layout column>
            <h1 class="title my-3">Mon profil</h1>

            <v-form>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <div v-for="(user, index) in tabData"
                                        :key="index">
                            
                           <div>Votre adresse email est : {{user.email}}</div><br>
                           <div>Votre nom est : {{user.name}}</div>

                            </div>
                        </v-col>

                        <v-col cols="12" sm="6">
                            <h2>Modification</h2>
                            <v-text-field v-model="nom" label="Nom" ></v-text-field>
                            <v-btn v-if="nom" color='green'>Enregister</v-btn>
                            <v-text-field v-model="email" label="Email" ></v-text-field>
                            <v-btn v-if="email" color='green'>Enregister</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </v-layout>
    </v-container>
</template>

<script>
import { db } from '../firebase/index';

export default {
    name: 'About',

    data(){
        return{

        tabData:[],
        
        email:'',
        nom:''

        }
  
    },

     beforeMount() {
        this.getName();
    },

    methods: {

        getName(){

            let tabArray = [];
            let query = db
                .collection('users')
                .where('email', '==', this.$store.getters.getUserEmail);
            query.get().then(function(querySnapshot) {
                querySnapshot.forEach(doc => {
                    let user = doc.data();
                    user.id = doc.id;
                    tabArray.push(user);
                });
            });
            this.tabData = tabArray;
           
           console.log(this.tabData)
            
        }

    }
};
</script>

<style scoped></style>
