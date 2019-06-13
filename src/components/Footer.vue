<template lang="html">

    <v-footer
            dark
            height="auto"
    >
        <v-card
                class="flex"
                flat
                tile
        >
            <v-card-title class="teal">
                <v-spacer></v-spacer>
            </v-card-title>

            <v-card-actions class="grey darken-3 justify-center">
                &copy;2019 —  <strong>Jakub Stankowski</strong>
            </v-card-actions>
        </v-card>
    </v-footer>

</template>

<script lang="js">
    export default {
        name: 'footer',
        props: [],
        mounted() {

        },
        data() {
            return {}
        },
        methods: {},
        computed: {}
    }
</script>

<style scoped lang="scss">
    .footer {

    }
</style>
