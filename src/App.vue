<template>
    <div id="app">
        <div id="container">
            <h1>To Do List</h1>
            <SearchBar />
            <List />
        </div>
    </div>
</template>

<script>
import SearchBar from "./SearchBar";
import List from "./List";
import BtnAll from "./BtnAll";
import BtnActive from "./BtnActive";
import BtnCompleted from "./BtnCompleted";

export default {
    name: "App",
    components: {
        SearchBar,
        List,
        BtnAll,
        BtnActive,
        BtnCompleted
    }

}
</script>

<style>
html {
    width:100%;
    height:100%;
},
#app {
    align: center;
    font-size: 4px;
}
#container {
    margin: auto;
}
</style>
