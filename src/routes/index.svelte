<script lang="js">
   
    import Gun from 'gun';
    import { onMount } from 'svelte';

    let list; 

    onMount(() => {
      list = document.getElementById('list');
    });

    const gun = Gun();
    console.clear()
    
    let value;

    const onKeyPress = e => {
        if (e.charCode === 13) add();
    };

    function add() {
      list.innerHTML += '<li><input type="checkbox">' + value + '</li><br/>'
    }
</script>

<div class="app">
    <div class="inputs">
        <input type="text" class="name" placeholder="Name of the poll"><br/>
        <div class="add-choices">
            <input bind:value={value} class="choices" type="text" placeholder="Your choices here" on:keypress={onKeyPress}><button on:click={add} class="submit-button">Submit</button>
        </div>
        <div id="list">
        </div>
    </div>
</div>

<style lang="css">
    .app {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .name {
        border: 0;
        border-radius: 25px;
        padding: 0.5rem;
        margin-bottom: 2em;
    }

    .choices {
        border: 0;
        padding: 0.5rem;

        border-top-left-radius: 25px;
        border-bottom-left-radius: 25px;
    }

    .add-choices {
        margin-bottom: 2em;
    }

    .submit-button {
        padding: 0.5rem;
        border: 0;
        border-top-right-radius: 25px;
        border-bottom-right-radius: 25px;
    }
</style>