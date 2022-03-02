const li = (task) => /*html*/`
<li data-task-id="${task.id}">
    ${task.description}

    <span>
        <button class="ctx-btn ctx-btn-done" event-click="fnConcluir">Concluir</button>
        <button class="ctx-btn ctx-btn-remove" event-click="fnRemover">Remover</button>
    </span>
</li>
`

export default ({ state }) => /*html*/`
<div class="ctx-content">
    <ul>

        ${
            state.tasks.map( task => li(task)).join('')
        }

    </ul>
</div>
`