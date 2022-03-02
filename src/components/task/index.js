import { appCreateTask } from '../create-task'
import { appShowTasks } from '../show-tasks'

export const appTask = () => {

    const children = () => ({
        appCreateTask,
        appShowTasks
    })

    const template = () => /*html*/`
        <div class="ctx-task-content">
            <div class="ctx-task-form">
                <app-create-task></app-create-task>
            </div>
            <div class="ctx-task-list">
                <app-show-tasks></app-show-tasks>
            </div>
        </div>
    `

    const styles = () => /*css*/`
        .ctx-task-content {
            display:flex;
            flex-wrap: wrap;
            width:100%;
            padding:15px;
            background:#f1f1f1;
        }
        .ctx-task-form {
            display:flex;
            width:100%;
            padding:15px;
            background:#dedede;            
        }
        .ctx-task-list {
            display:flex;
            width:100%;
            padding:15px;
            background:#ccc;            
        }
    `

    return { template, styles, children }

}