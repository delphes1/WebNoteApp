<template>
    <v-container fluid fill-height class="home-pres" style="max-height: 100vh;">
        <v-layout justify-center align-center column pa-5>
            <div
                class="display-3 font-weight-black brown--text text-xs-center"
            >Bienvenue dans l'application</div>
            <div class="display-3 font-weight-black brown--text text-xs-center mb-3">WebNoteApp</div>
            <div
                class="display-1 font-weight-bold brown--text text-xs-center"
            >Gardez vos notes où que vous soyez avec votre compte WebNoteApp.</div>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    name: 'HomePresentation'
};
</script>

<style scoped>
.home-pres {
    background: url('../../img/11111.jpg');
    background-size: cover;
    width: 100%;
    height: 100%;
}
</style>
