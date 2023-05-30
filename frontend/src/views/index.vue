<template>
    <div>
        <div class="main" @click="add" :style="{ backgroundColor: b }">
            {{ a }}
        </div>
        <div v-for="item in items">{{ item }}</div>
        <div style="height: 300px" v-if="if_show">{{ 1111111111 }}</div>
        <example />
    </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter';
import { ref } from 'vue';
const a = ref(0);
const if_show = ref(false)
let b = "#000000"
const items: string[] = [];

function add() {
    console.log("click");
    useCounterStore().increment();
    a.value = useCounterStore().count;
    b = "#666666";
    if_show.value = true;
}

</script>

<style scoped>
.main {
    background-color: aquamarine;
}
</style>