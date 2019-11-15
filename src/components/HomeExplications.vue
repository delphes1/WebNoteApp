<template>
    <v-container fluid class="brown lighten-4">
        <v-container grid-list-lg>
            <v-layout column>
                <v-flex
                    class="display-2 font-weight-black brown--text text-xs-center my-5"
                >Comment ça marche</v-flex>
                <v-flex>
                    <div class="headline mt-3 brown--text font-weight-bold">Connexion</div>
                    <p class="subheading mt-3">
                        Créez un compte WebNoteApp avec votre adresse email et un mot de passe.
                        Lorsque votre compte a été créé vous pourez vous connecter grâce a votre
                        email et votre mot de passe.
                    </p>
                </v-flex>
                <v-flex>
                    <div class="headline mt-3 brown--text font-weight-bold">Gérer une note</div>
                    <p class="subheading mt-3">
                        Pour commencer, appuyez sur le bouton ajouter une note. une fenêtre s'ouvriva
                        et vous n'avez plus qu'à ajouter un titre à votre note et écrire votre note
                        dans l'espace indiqué.
                    </p>

                    <p class="subheading mt-3">
                        Pour modifier une note, vous pouvez cliquer sur le bouton "Modifier"
                        qui vous permettra d'afficher un éditeur afin de modifier le titre ou la note.
                    </p>

                    <p class="subheading mt-3">
                        Pour supprimer une note, vous devez appuyer sur le bouton "Supprimer".
                        <br />
                        <br />
                        <strong>Attention :</strong> le bouton "Tout Supprimer" supprimera toutes les notes
                        de votre compte WebNoteApp.
                    </p>
                </v-flex>
                <v-flex>
                    <div class="headline mt-3 brown--text font-weight-bold">Mon compte</div>
                    <p
                        class="subheading mt-3"
                    >Vous pourrez à tout moment modifier les informations de connexion liées à votre compte WebNoteApp.</p>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'HomeExplications'
};
</script>

<style scoped></style>
