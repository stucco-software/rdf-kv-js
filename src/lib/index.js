// Reexport your entry components here
export const add = (x, y) => x + y

const objectIsResource = (predicate) => predicate.endsWith(' :')
const objectHasLang = (predicate) => predicate.includes(' @')
const objectHasType = (predicate) => predicate.includes(' ^')

const reducer = (subject) => (acc, cur, i) => {
  let out
  let predicate
  let lang
  let type
  switch (true) {
    case objectIsResource(cur[0]):
      predicate = cur[0].split(' :')[0]
      return `${acc}<${subject}> ${predicate} <${cur[1]}> . `
    case objectHasLang(cur[0]):
      predicate = cur[0].split(' @')[0]
      lang = cur[0].split(' @')[1]
      return `${acc}<${subject}> ${predicate} "${cur[1]}"@${lang} . `
    case objectHasType(cur[0]):
      predicate = cur[0].split(' ^')[0]
      type = cur[0].split(' ^')[1]
      return `${acc}<${subject}> ${predicate} "${cur[1]}"^^${type} . `
    case !objectIsResource(cur[0]):
      predicate = cur[0]
      return `${acc}<${subject}> ${predicate} "${cur[1]}" . `
    default:
      break;
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