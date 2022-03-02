import { uuid } from './uuid'
import { domFactory } from './domFactory'

export const createApp = (selector, factories) => {
  const appElement = document.querySelector(selector)

  const hasState = (component) => 
    component.hasOwnProperty('state') && keyHasFunction('on', component.state) 

  const watchState = (component) => {
    if(!hasState(component)) return

    component.state.on((payload) => {
      const parentElement = component.element.parentElement
      render(component, parentElement, payload)
    })
  }

  const createComponent = (factory, element = null) => {
    const selector = createSelector(factory.name)
    const componentElement = element ? element : createElement(selector)
    const contextId = uuid(selector)
    const component = factory()
    
    component.element = componentElement
    component.selector = selector
    component.contextId = contextId
    watchState(component)

    return component
  }

  const createSelector = (text) => 
    text.split(/(?=[A-Z])/).join('-').toLowerCase()

  const createElement = (selector) => document.createElement(selector)

  const applyContext = (text, id) => text.replace(/ctx/gi, id)

  const bindStyles = (component) => {
    const styleElement = document.createElement('style')
    const styles = component.styles(component.selector)
    styleElement.innerHTML = applyContext(styles, component.contextId)
    document.querySelector('head').append(styleElement)
  }

  const keyHasFunction = (key, object) => 
    object.hasOwnProperty(key) && typeof object[key] === 'function'

  const executeHook = (hookName, hooks, options) => {
    if (!keyHasFunction(hookName, hooks)) return
    hooks[hookName](options)
  }

  const bindHook = (hookName, component) => {
    if (!keyHasFunction('hooks', component)) return
    const dom = domFactory(component.element)
    const hooks = component.hooks(dom)
    executeHook(hookName, hooks, dom)
  }

  const renderChildren = (parentComponent) => {
    if (!keyHasFunction('children', parentComponent)) return

    const { children } = parentComponent
    const childrenFactories = children()

    for (let key in childrenFactories) {
      const selector = createSelector(key)
      const childElement = parentComponent.element.querySelector(selector)
      const component = createComponent(childrenFactories[key], childElement)
      const state = component?.state?.get() || {}
      bindHook('beforeOnInit', component)
      render(component, parentComponent.element, state)
      bindHook('afterOnInit', component)
    }
  }

  const render = (component, parentElement = null, payload = {}) => {
    const { template, contextId } = component
    bindHook('beforeOnRender', component)
    component.element.innerHTML = applyContext(template({ ...payload }), contextId)
    if (!parentElement) appElement.append(component.element)
    bindStyles(component)
    bindHook('afterOnRender', component)
    renderChildren(component)
  }

  const init = () => {
    for (let key in factories) {
      const component = createComponent(factories[key])
      const state = component?.state?.get() || {}
      bindHook('beforeOnInit', component)
      render(component, null, state)
      bindHook('afterOnInit', component)
    }
  }

  return { init }
}
