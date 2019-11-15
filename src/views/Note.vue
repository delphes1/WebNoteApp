<template>
    <v-content>
        <v-container>
            <v-row align="center" justify="center" style="display: flex; width: 100%;">
                <v-col style="flex: 3;">
                    <v-card align="center" justify="center" class="elevation-12">
                        <v-toolbar color="brown" dark flat align="center" justify="center">
                            <v-layout align-center justify-center>
                                <h2 class="titleApp">Créer des notes</h2>
                            </v-layout>
                        </v-toolbar>
                        <QuillNote />
                        <NoteApp />
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-content>
</template>

<script>
import NoteApp from '../components/NoteApp';
import QuillNote from '../components/QuillNote';

export default {
    components: {
        NoteApp,
        QuillNote
    }
};
</script>

<style >
#editorrr {
    display: none;
}
</style>