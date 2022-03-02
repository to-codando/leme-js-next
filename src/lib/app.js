import { uuid } from "./uuid"
import { domFactory } from "./domFactory"

export const createApp = (selector, factories) => {
  const appElement = document.querySelector(selector)


  const watchState = (component) => {
    const hasState = component.hasOwnProperty('state') && typeof component.state.on === 'function'
    if(!hasState) return

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

  const createSelector = (text) => {
    return text
      .split(/(?=[A-Z])/)
      .join("-")
      .toLowerCase()
  }

  const createElement = (selector) => {
    return document.createElement(selector)
  }

  const applyContext = (text, id) => {
    return text.replace(/ctx/gi, id)
  }

  const bindStyles = (component) => {
    const headElement = document.querySelector("head")
    const styleElement = document.createElement("style")
    const styles = component.styles(component.selector)
    styleElement.innerHTML = applyContext(styles, component.contextId)
    headElement.append(styleElement)
  }

  const bindEvents = (component) => {
    if(!component.hasOwnProperty('events')) return
    if(typeof component.events !== 'function') return

    const dom = domFactory(component.element)
    component.events(dom)
  }

  const renderChildren = (parentComponent) => {
    const childrenExists =
      parentComponent.hasOwnProperty("children") &&
      typeof parentComponent.children === "function"

    if (!childrenExists) return

    const { children } = parentComponent
    const childrenFactories = children()

    for (let key in childrenFactories) {
      const selector = createSelector(key)
      const childElement = parentComponent.element.querySelector(selector)
      const component = createComponent(childrenFactories[key], childElement)
      const state = component?.state?.get() || {}
      render(component, parentComponent.element, state)
    }
  }

  const render = (component, parentElement = null, payload = {}) => {
    const { template, contextId } = component
    const state = { ...payload }
    component.element.innerHTML = applyContext(template({ state }), contextId)
    if (!parentElement) appElement.append(component.element)
    bindStyles(component)
    bindEvents(component)
    renderChildren(component)
  }

  const init = () => {
    for (let key in factories) {
      const component = createComponent(factories[key])
      const state = component?.state?.get() || {} 
      render(component, null, state)
    }
  }

  return { init }
}
