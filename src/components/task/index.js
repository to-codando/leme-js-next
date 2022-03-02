import template from './template'
import styles from './styles'

import { appCreateTask } from "../create-task"
import { appShowTasks } from "../show-tasks"


export const appTask = () => {

    const children = () => ({
        appCreateTask,
        appShowTasks
    })

    return { template, styles, children }

}