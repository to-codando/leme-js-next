import { createApp } from './lib/app'
import { appTask } from './components/task'

const app = createApp('#app', {
    appTask
})

app.init()