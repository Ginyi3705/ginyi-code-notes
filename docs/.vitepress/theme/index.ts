import Theme from 'vitepress/theme'
import './styles/vars.scss'
import './styles/style.scss'
import { App } from 'vue'
import { NaiveUIContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'

export default {
  ...Theme,
  enhanceApp({ app }: { app: App }) {
    app.component('demo-preview', NaiveUIContainer)
  },
}