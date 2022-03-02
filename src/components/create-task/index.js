import template from './template'
import styles from './styles'

import { state } from '../../store/tasks.observer'

export const appCreateTask = () => {

    const task = {}

    const hooks = () => ({
        beforeOnInit,
        afterOnInit,
        afterOnRender,
        beforeOnRender
    })    

    const setValue = (prop, value) => {
        task[prop] = value
    }

    const setTask = ({ target: {value} }) => {
        setValue('id', createId())
        setValue('description', value)
    }

    const addTask = (task) => {
        const { tasks: oldTasks } = state.get()
        const tasks = [...oldTasks, task]
        state.set({ tasks })
    }

    const setFocus = (element) => {
        element.focus()
    }

    const createId = () => {
        const { tasks } = state.get()
        return tasks.length + 1
    }

    const clearTask = (textField) => {
        textField.value = ''
        setValue('id', '')
        setValue('description', '')
    }

    const beforeOnRender = ({ queryOnce }) => {

    }

    const beforeOnInit = () => {
        
    }
    
    const afterOnInit = ({ queryOnce }) => {
        const input = queryOnce('#task')
        input.focus()
    }

    const afterOnRender = ({ on, queryOnce }) => {
        
        const textField = queryOnce('#task')
        const buttonCreate = queryOnce('[create-task]')

        on('onkeyup', textField, setTask)

        on('onclick', buttonCreate, () => {
            addTask(task)
            clearTask(textField)
            setFocus(queryOnce('#task'))
        })
    }

   
    return { template, styles, hooks, state }
}