<template>
    <span>
        <v-navigation-drawer v-model="drawer" absolute temporary>
            <v-divider></v-divider>

            <v-list dense>
                <v-list-item v-for="item in items" :key="item.title" link :to="item.url">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app class="toolbar" dark>
            <v-app-bar-nav-icon
                class="hidden-md-and-up"
                @click="drawer = !drawer"
                v-if="!isAuthenticated"
            ></v-app-bar-nav-icon>
            <v-spacer class="hidden-md-and-up"></v-spacer>
            <router-link to="/">
                <v-toolbar-title>{{ Titre }}</v-toolbar-title>
            </router-link>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <div v-if="!isAuthenticated" class="hidden-sm-and-down">
                <v-btn flat to="/sign-in">CONNEXION</v-btn>
                <v-btn color="brown lighten-3" to="/join" class="nav-join">S'INSCRIRE</v-btn>
            </div>
            <div class="headconnecte" v-else>
                <v-btn flat to="/note">
                    <v-icon medium>description</v-icon>
                </v-btn>
                <v-btn flat to="/about">
                    <v-icon medium>fas fa-user-alt</v-icon>
                </v-btn>
                <v-btn @click="logout">
                    <v-icon medium>fas fa-door-open</v-icon>
                </v-btn>
            </div>
        </v-toolbar>
    </span>
</template>

<script>
export default {
    name: 'AppNavigation',
    data() {
        return {
            Titre: 'WebNoteApp',
            drawer: false,
            items: [
                { title: 'Se Connecter', url: '/sign-in' },
                { title: "S'Inscrire", url: '/join' }
            ]
        };
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('userSignOut');
        }
    }
};
</script>

<style scoped>
a {
    color: white !important;
    text-decoration: none;
}
.headconnecte {
    display: flex;
}

.toolbar{

  background-color: #795548!important;

}
</style>
