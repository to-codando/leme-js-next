import { state } from '../../store/tasks.observer'

export const appShowTasks = () => {

    const { tasks } = state.get()

    
    const fnConcluir = () => {
        console.log('concluir...')
    }

    const fnRemover = () => {
        console.log('Remover...')
    }

    const events = ({ on, queryAll }) => {

        const btnConcluir = queryAll('[event-click=fnConcluir]')
        const btnRemover = queryAll('[event-click=fnRemover]')

        on('onclick', btnConcluir, fnConcluir)
        on('onclick', btnRemover, fnRemover)
    }

    const li = (task) => /*html*/`
        <li data-task-id="${task.id}">
            ${task.description}

            <span>
                <button class="ctx-btn ctx-btn-done" event-click="fnConcluir">Concluir</button>
                <button class="ctx-btn ctx-btn-remove" event-click="fnRemover">Remover</button>
            </span>
        </li>
    `

    const template = ({ state }) => /*html*/`
        <div class="ctx-content">
            <ul>

                ${
                    state.tasks.map( task => li(task)).join('')
                }

            </ul>
        </div>
    `

    const styles = (root) => /*css*/`
        ${root}, .ctx-content {
            display:flex;
            width:100%;
        }

        .ctx-content > ul {
            display:flex;
            flex-wrap:wrap;
            width:100%;
            margin:0;
            padding:0;
        }

        .ctx-content > ul > li {
            display:flex;
            justify-content:space-between;
            align-items:center;
            width:100%;  
            background: #f1f1f1;
            margin-bottom:.5rem;
            padding: 1rem; 

        }

        .ctx-content > ul > li:nth-of-type(2n + 1) {
            background:#f9f9f9
        }

        .ctx-btn {
            border-radius: 5px;
            border-style: solid;
            border-width:1px;
            padding:1rem 1.5rem;
        }

        .ctx-btn + .ctx-btn { margin-left: 1rem }

        .ctx-btn-remove {
            border-color: #ff369c;
            color: #ff369c;
        }

        .ctx-btn-done {
            background: #bce7d9;
            border-color: #bce7d9;
            color: #1a654d;
        }

    `

    return { template, styles, events, state }
}