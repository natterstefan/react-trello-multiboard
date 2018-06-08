import { find } from 'lodash'

export const getMemberByProperty = (members, prop, value) => find(members, { [prop]: value })

export const getMemberByOneOfProperty = (members, props = [], value) =>
  find(members, m => find(props, p => m[p] === value))
