<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="brown">
                        <v-toolbar-title>Inscription</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid" lazy-validation>

                        <v-container fluid>
                            <v-text-field
                                color="brown"
                                v-model="name"
                                required
                                label="Nom"
                                placeholder="Entrez un Nom"
                                loading
                                :rules="nameRules"
                                v-on:keyup.enter="submit"
                                >
                                <template v-slot:progress>
                                    <v-progress-linear
                                    v-if="custom"
                                    :value="progress()"
                                    :color="color()"
                                    absolute
                                    height="7"
                                    ></v-progress-linear>
                                </template>
                                </v-text-field>

                            </v-container>

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
                                required
                                v-model="password"
                                :rules="passwordRules"
                                v-on:keyup.enter="submit"
                            >
                            </v-text-field>

                             


                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn id="submiit"
                            color="brown"
                            :disabled="!valid"
                            @click="submit"
                            >M'inscrire</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'Join',
    data() {
        return {
            custom: true,
            name: '',
            valid: false,
            email: '',
            password: '',
            nameRules: [
                v => !!v || 'Nom requis',
                v => v.length >= 4 || 'Le nom doit comporter au moins 4 caractères'
            ],
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
                this.$store.dispatch('userJoin', {
                    email: this.email,
                    password: this.password,
                    name: this.name
                   
                });         
            }
        },
        progress () {
      return Math.min(100, this.name.length * 25 )
    },
    color () {
      return ['error', 'warning', 'success'][Math.floor(this.progress() / 40)]
    }

    }
};
</script>

<style scoped>

#submiit{

    color: white;

}

</style>
