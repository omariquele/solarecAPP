import { Loading, Notify } from "quasar";

let instance = null

export function showSuccessMessage(payload) {
  Loading.hide()
  closeNotify() //fecha as notifys ja existentes
  instance = Notify.create({
    color:    payload.color || 'green',
    progress: true,
    icon:     'check_circle',
    message:  payload.message,
    actions:  [{ icon: 'clone', color: 'white' }]
  })
}

export function showErrorMessage(payload) {
  Loading.hide()
  closeNotify() //fecha as notifys ja existentes
  instance = Notify.create({
    color:    payload.color || 'dark',
    progress: true,
    icon:     payload.icon || 'info',
    message:  payload.message || payload,
    actions:  [{ icon: 'close', color: 'white' }]
  })
}

export function closeNotify() {
  if (instance) {
    instance()
  }
}
