<template>
  <div class="race-list">
    <div class="race" v-for="(race, index) in raceList" :key="index">
      {{ race.name }} - {{ race.country }}
    </div>
  </div>
</template>

<script setup>
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseApp from "@/services/firebase";
import { ref } from "vue";

const raceList = ref([]);
const db = getFirestore(firebaseApp);
const colRef = collection(db, "races");
const docs = await getDocs(colRef);
docs.forEach((doc) => {
  raceList.value.push(doc.data());
});
</script>
