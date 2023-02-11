<template>
    <q-layout view="lHh Lpr lFf">
        <MainHeader
            :leftDrawerOpen="leftDrawerOpen"
            :centerText="'롤링 페이퍼'"
        ></MainHeader>

        <q-drawer
            v-model="leftDrawer"
            show-if-above
            bordered
            content-class="bg-grey-1"
        >
            <q-list>
                <q-item-label header class="text-grey-8">
                    Essential Links
                </q-item-label>
                <EssentialLink
                    v-for="link in essentialLinks"
                    :key="link.title"
                    v-bind="link"
                />
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
// import EssentialLink from "components/EssentialLink.vue";
import MainHeader from 'src/components/MainHeader.vue';

export default {
    name: 'MainLayout',
    components: {
        MainHeader,
    },
    data() {
        return {
            leftDrawer: false,
            // essentialLinks: linksData,
        };
    },
    methods: {
        leftDrawerOpen() {
            console.log();
            this.leftDrawer = !this.leftDrawer;
        },
    },
};
</script>
