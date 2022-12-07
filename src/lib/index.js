// Reexport your entry components here
export const add = (x, y) => x + y

const objectIsResource = (str) => str.endsWith(':')
const objectIsLiteral = (str) => str.endsWith(`'`)
const objectHasLang = (str) => str.includes('@')
const objectHasType = (str) => str.includes('^')
const objectIsInverted = (str) => str.includes('!')
const objectIsDeleted = (str) => str.includes('-')
const objectReplaces = (str) => str.includes('=')

const parseTuple = (subject, arr, object) => {
  let predicate = arr[0]
  switch (true) {
    case objectIsResource(arr[1]):
      object = `<${object}>`
      break;
    case objectIsLiteral(arr[1]):
      object = `"${object}"`
      break;
    case objectHasLang(arr[1]):
      object = `"${object}"${arr[1]}`
      break;
    case objectHasType(arr[1]):
      object = `"${object}"^${arr[1]}`
      break;
    case objectIsInverted(arr[0]):
      [subject, object] = [object, subject];
      predicate = arr[1]
      object = `<${object}>`
      break;
    default:
      // default case is predicate subject
      // delete and merge will have to be more complex I think
      subject = `${arr[0]}`
      predicate = arr[1]
      object = `"${object}"`
      break;
      break;
  }
  return `<${subject}> ${predicate} ${object}`
}

const reducer = (subject) => (acc, cur, i) => {
  let arr = cur[0].split(' ')
  let object = cur[1]
  let predicate
  switch (arr.length) {
    case 2:
      return `${acc}${parseTuple(subject, arr, object)} . `
    default:
      predicate = arr[0]
      return `${acc}<${subject}> ${predicate} "${object}" . `
  }
}

const reduceEntries = (subject, formData) => [...formData.entries()].reduce(reducer(subject), '')

const rdfkv = (subject, formData) => {
  return {
    delete: '',
    insert: reduceEntries(subject, formData)
  }
}

export default rdfkv