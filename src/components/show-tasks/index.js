import { state } from '../../store/tasks.observer'

import template from './template'
import styles from './styles'

export const appShowTasks = () => {

    const { tasks } = state.get()

    const hooks = () => ({
        afterOnRender
    })

    
    const fnConcluir = () => {
        console.log('concluir...')
    }

    const fnRemover = () => {
        console.log('Remover...')
    }

    const afterOnRender = ({ on, queryAll }) => {

        const btnConcluir = queryAll('[event-click=fnConcluir]')
        const btnRemover = queryAll('[event-click=fnRemover]')

        on('onclick', btnConcluir, fnConcluir)
        on('onclick', btnRemover, fnRemover)
    }

    return { template, styles, hooks, state }
}