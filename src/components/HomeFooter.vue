<template>
    <v-footer dark padless flat tile class="indigo lighten-1 white--text text-center" id="footer">
        <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
            <strong class="subheading">Suivez-moi sur mes réseaux</strong>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
            &copy; {{ new Date().getFullYear() }} —
            <strong>WebNoteApp by Delphes Jabri</strong>
        </v-card-text>
    </v-footer>
</template>

<script>
export default {
    name: 'HomeFooter',

    data() {
        return {
            icons: [
                'fab fa-facebook',
                'fab fa-twitter',
                'fab fa-google-plus',
                'fab fa-linkedin',
                'fab fa-instagram'
            ]
        };
    }
};
</script>

<style scoped>
#footer {
    background-color: #795548 !important;
}
</style>
