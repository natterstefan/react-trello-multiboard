import * as pkg from '../../../package.json'

const info = {
  version: pkg.version,
  name: pkg.name,
}

export function reducer(state = info) {
  return state
}
