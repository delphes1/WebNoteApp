<template>
    <v-col style="flex: 2;">
        <div>
            <div id="editorrr">
                <!-- Creation de la toolbar pour l'éditeur -->
                <div id="toolbar" class="sc-toolbar-container toolbar">
                    <div class="sc-format-group">
                        <span class="sc-bold sc-format-button"></span>
                        <span class="sc-italic sc-format-button"></span>
                        <span class="sc-strike sc-format-button"></span>
                        <span class="sc-underline sc-format-button"></span>
                        <span class="sc-link sc-format-button"></span>
                        <span class="sc-format-separator"></span>
                    </div>
                </div>
                <!-- Creation de l'espace de la note -->
                <div id="editor">
                    <p id="noteeditor">Hello World!</p>
                </div>
            </div>
        </div>
    </v-col>
</template>

<script>
import Quill from 'quill';
import NoteApp from './NoteApp';

export default {
    mounted() {
        var editor = new Quill('#editor', {
            theme: 'snow',
            formats: [
                'bold',
                'header',
                'italic',
                'link',
                'list',
                'blockquote',
                'image',
                'indent'
            ],
            modules: {
                syntax: true,
                toolbar: [
                    [{ font: [] }, { size: [] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ color: [] }, { background: [] }],
                    [{ script: 'super' }, { script: 'sub' }],
                    [
                        { header: '1' },
                        { header: '2' },
                        'blockquote',
                        'code-block'
                    ],
                    [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' }
                    ],
                    ['direction', { align: [] }],
                    ['link', 'image', 'video', 'formula'],
                    ['clean']
                ]
            }
        });
    }
};
</script>