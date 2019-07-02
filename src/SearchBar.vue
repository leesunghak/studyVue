<template>
    <div>
        <input id="searchBarInput" type="text" placeholder="What to do" v-model="newToDo" @keyup.enter="addTodo">
        </input>
        <div v-for="(todo, index) in todosFiltered" :key="todo.id" class="todo-item">
            <div class="todo-item-left">
            <input type="checkbox" v-model="todo.completed">
                <div 
                    v-if="!todo.editing" 
                    class="todo-item-label" 
                    @dblclick="editTodo(todo)" 
                    :class="{ completed : todo.completed }">{{ todo.title }}</div>
                <input 
                    v-else 
                    class="todo-item-edit" 
                    type="text" v-model="todo.title" 
                    @blur="doneEdit(todo)" 
                    @keyup.enter="doneEdit(todo)" 
                    @keyup.esc="cancelEdit(todo)" 
                    v-focus>
            </div>
            <div class="remove-item" @click="removeTodo(index)">
                &times;
            </div>
        </div>
        <div class="extra-container">
            <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos"> Check All</label></div>
            <div>{{ remaining }} items left</div>
        </div>
        <div class="extra-container">
            <div>
                <button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
                <button :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
                <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
            </div>
            <div>
                <button v-if="showClearCompletedBtn" @click="clearCompleted">Clear Completed</button>
            </div>
        </div>
    </div>
    
</template>

<script>
    
    export default {
        name: 'SearchBar',
        data () {
            return {
                beforeEditCache: '',
                newToDo: '',
                idForToDo: 3,
                filter: 'all',
                todos: [
                    {
                        'id': 1,
                        'title': 'Finish vue practice',
                        'completed': false,
                        'editing': false,
                    },
                    {
                        'id': 2,
                        'title': 'Finish react practice',
                        'completed': false,
                        'editing': false,
                    }
                ]
            }
        },
        computed: {
            remaining() {
                return this.todos.filter(todo => !todo.completed).length
            },
            anyRemaining() {
                return this.remaining !== 0
            },
            todosFiltered() {
                if(this.filter == 'all') {
                    return this.todos;
                } else if (this.filter == 'active') {
                    return this.todos.filter(todo => !todo.completed)
                }else if (this.filter == 'completed') {
                    return this.todos.filter(todo => todo.completed)
                }
            },
            showClearCompletedBtn() {
                return this.todos.filter(todo => todo.completed).length > 0
            }
        },
        //immediately focus blurred component
        directives: {
            focus: {
                inserted: function(el) {
                    el.focus()
                }
            }
        },
        methods: {
            addTodo() {
                if(this.newToDo.trim().length == 0) {
                    return
                }
                this.todos.push({
                    id: this.idForToDo,
                    title: this.newToDo,
                    completed: false,
                })

                this.newToDo = ''
                this.idForToDo++
            },
            cancelEdit(todo) {
                todo.title = this.beforeEditCache
                todo.editing = false
            },
            checkAllTodos() {
                this.todos.forEach((todo) => todo.completed = event.target.checked)
            },
            clearCompleted() {
                this.todos = this.todos.filter(todo => !todo.completed)
            },
            doneEdit(todo) {
                if(todo.title.trim().length == 0) {
                    todo.title = this.beforeEditCache;
                }
                todo.editing = false
            },
            editTodo(todo) {
                this.beforeEditCache = todo.title
                todo.editing = true
            },
            removeTodo(index) {
                this.todos.splice(index, 1);
            }
        }
    }
</script>

<style>
#searchBarInput {
    height: 40px;
    width: 70%;
    padding: 10px 18px;
    font-size: 18px;
    &: focus {
    outline: 0;
    }
}

.todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.remove-item {
    cursor: pointer;
    margin-left: 14px;
    &: hover {
        color: black;
    }
}

.todo-item-left {
    display: flex;
    align-items: center;
}

.todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
    margin-top: 10px;
}

.todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    margin-top: 10px;
}

.completed {
    text-decoration: line-through;
    color: gray;
}

.extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
}

button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    &:hover {
        background: lightgreen;
    }

    &:focus {
     outline: none;
    }
}

.active {
    background: lightgreen;
}

</style>