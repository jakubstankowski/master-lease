<template lang="html">

    <section class="about-us">
        <v-hover>
            <v-card
                    slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`"
                    class="mx-auto"
                    width="344"
            >
                <v-img
                        :aspect-ratio="16/9"
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                ></v-img>
                <v-card-title>
                    <div>
                        <span class="headline">Master Lease</span>
                        <div class="d-flex">
                            <v-rating
                                    :value="value"
                                    color="amber"
                                    dense
                                    half-increments
                                    readonly
                                    size="14"
                            ></v-rating>
                            <div class="ml-2 grey--text text--darken-2">
                                <span>{{ value }}</span>
                                <span>({{ reviews }})</span>
                            </div>
                        </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn icon class="mr-0">
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-card-title>
            </v-card>
        </v-hover>
    </section>

</template>

<script lang="js">
    export default {
        name: 'about-us',
        props: [],
        mounted() {

        },
        data() {
            return {
                reviews: 513,
                value: 4.7

            }
        },
        methods: {},
        computed: {}
    }
</script>

<style scoped lang="scss">
    .about-us {

    }
</style>
