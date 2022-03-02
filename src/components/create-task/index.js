import { state } from '../../store/tasks.observer'

export const appCreateTask = () => {

    let description = ''

    const updateDescription = ({value}) => {
        description = value
    }

    const createId = () => {
        const { tasks } = state.get()
        return tasks.length + 1
    }

    const clearTextField = (textField) => {
        textField.value = ''
    }

    const createTask = () => {
        const id = createId()
        const { tasks: oldTasks } = state.get()
        const newTask = { id, description }
        const tasks = [ ...oldTasks, newTask]
        state.set({ tasks })
    }

    const events = ({ on, queryOnce }) => {
        const textField = queryOnce('#task')
        on('onkeyup', textField, ({ target }) => updateDescription(target))

        const buttonCreateTask = queryOnce('[event-click=createTask]')
        on('onclick', buttonCreateTask, () => {
            createTask()
            clearTextField(textField)
        })
    }

    const template = () => /*html*/`
        <div class="ctx-content">
            <label>
                <span>Tarefa teste</span>
                <input type="text" id="task">
            </label>
            <button event-click="createTask">Criar</button>
        </div>
    `

    const styles = (root) => /*css*/`
        ${root},
        .ctx-content {
            display:flex;
            align-items:flex-end;
            width:100%;
        }    

        .ctx-content label {
            display:flex;
            flex-wrap:wrap;
            width:calc(100% - 150px);
            padding-right:15px;
        }

        .ctx-content span {
            width:100%;
            padding-bottom:5px;
        }  

        .ctx-content input {
            width:100%;
            height:75px;
            padding:0 15px;
            border-radius:5px;
            border:0;
            background:#fff;
            color: #666;
        }     
        
        .ctx-content button {
            display:flex;
            align-items:center;
            justify-content:center;
            width:150px;
            height:75px;
            border:0;
            border-radius:5px;
            background: #000;
            color:#fff;
            font-size: .875em;
            text-transform: uppercase;
        }
    `

    return { template, styles, events }
}