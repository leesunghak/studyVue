<template>
    <div id="app">
        <div id="container">
            <h1>To Do List</h1>
            <SearchBar />
        </div>
    </div>
</template>

<script>
import SearchBar from "./SearchBar";

export default {
    name: "App",
    components: {
        SearchBar,
    }

}
</script>

<style>
html {
    width:100%;
    height:100%;
},
#app {
    font-size: 4px;
}
#container {
    margin: 5% 30%;
}
</style>
