<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="brown">
                        <v-toolbar-title>Connexion</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field
                                color="brown"
                                prepend-icon="person"
                                name="email"
                                label="Email"
                                type="email"
                                v-model="email"
                                :rules="emailRules"
                                required
                                v-on:keyup.enter="submit"
                            >
                            </v-text-field>
                            <v-text-field
                            color="brown"
                                prepend-icon="lock"
                                name="password"
                                label="Mot de passe"
                                type="password"
                                v-model="password"
                                :rules="passwordRules"
                                required
                                v-on:keyup.enter="submit"
                            >
                            </v-text-field>
                            <br>
                            <p class="erreur_texte">Le mot de passe ou l'email est incorrect, veuillez réessayer </p>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            id="submiit"
                            color="brown"
                            :disabled="!valid"
                            @click="submit"
                            >Me connecter</v-btn
                        >
                       
                    </v-card-actions>
                    
                </v-card>
 
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>


export default {
    name: 'Signin',
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail requis',
                v => /.+@.+/.test(v) || "Format d'Email non valide"
            ],
            passwordRules: [
                v => !!v || 'Mot de passe requis',
                v =>
                    v.length >= 8 ||
                    'Le mot de passe doit contenir au moins 8 caractères'
            ]
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                this.$store.dispatch('userLogin', {
                    email: this.email,
                    password: this.password
                });
               
            }
        }
    }
};
</script>

<style scoped>

.erreur_texte{

    color:brown!important;

}

#submiit{

color: white;

}

</style>
