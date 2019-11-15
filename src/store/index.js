import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import firebase from 'firebase';

import { db } from '../firebase/index.js';

Vue.use(Vuex);

const { log } = console;

export default new Vuex.Store({
    state: {
        user: null,
        isAuthenticated: false
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        }
    },
    actions: {
        userLogin({ commit }, { email, password }) {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    router.push('/note');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/sign-in-r');
                });
        },
        userJoin({ commit }, { email, password, name }) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    log(user);
                    log('test ', user.user.uid);
                    db.collection('users')
                        .doc(user.user.uid)
                        .set({
                            email,
                            name
                        })
                        .then(function() {
                            log('Document written !');
                        })
                        .catch(function(error) {
                            log('Error adding document: ', error);
                        });

                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    router.push('/sign-in');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/join-r');
                });
        },

        addNote(_, { title, note, userId, timestamp }) {
            log('une note', note, title, userId);

            db.collection('notes')
                .add({
                    note,
                    title,
                    userId,
                    timestamp
                })
                .then(function() {
                    log('Note ecrite !');
                })
                .catch(function(error) {
                    log('Erreur de note', error);
                });
        },
        userSignOut({ commit }) {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                })
                .catch(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    router.push('/');
                });
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        },
        getUserId(state) {
            return state.user.user.uid;
        },
        getUserEmail (state){

            return state.user.user.email;
        }
    }
});
