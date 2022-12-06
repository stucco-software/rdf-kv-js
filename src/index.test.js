import { describe, it, expect } from 'vitest'
import rdfkv, { add } from '$lib/index.js'

const createFormData = (obj) => {
	const formData = new FormData();
	for (const [key, value] of Object.entries(obj)) {
	  formData.append(key, value);
	}
	return formData
}

describe('sum test', () => {
	it('adds 1 + 2 to equal 3', () => {
		expect(add(1, 2)).toBe(3);
	});
});



describe('Convert Simple Form to RDF Triples', () => {
	// <form method="POST" action="http://example.com/my/resource">
	//   <input type="text" name="http://purl.org/dc/terms/title"/>
	//   <button>Set the Title</button>
	// </form>
	// will produce:
	// <http://example.com/my/resource> dct:title "Whatever you wrote" .
	it('With provided literal values', () => {
		let formData = createFormData({
		  "dct:title": "Whatever you wrote"
		})

		expect(rdfkv('http://example.com/my/resource', formData))
			.toMatchObject({
				delete: '',
				insert: '<http://example.com/my/resource> dct:title "Whatever you wrote" . '
			});
	});

	// refernce a node:
	// <input name="http://www.w3.org/1999/02/22-rdf-syntax-ns#type :"/>
	it('References a node', () => {
		let formData = createFormData({
		  "rdf:type :": 'http://example.com/my/type'
		})

		expect(rdfkv('http://example.com/my/resource', formData))
			.toMatchObject({
				delete: '',
				insert: '<http://example.com/my/resource> rdf:type <http://example.com/my/type> . '
			});
	})

	it('Can do both literals and nodes at the same time!', () => {
		let formData = createFormData({
			"dct:title": "Whatever you wrote",
		  "rdf:type :": 'http://example.com/my/type'
		})

		expect(rdfkv('http://example.com/my/resource', formData))
			.toMatchObject({
				delete: '',
				insert: '<http://example.com/my/resource> dct:title "Whatever you wrote" . <http://example.com/my/resource> rdf:type <http://example.com/my/type> . '
			});
	})
});



// refernce a node:
// <input name="http://www.w3.org/1999/02/22-rdf-syntax-ns#type :"/>

// reference a blank node:
// <input name="http://www.w3.org/1999/02/22-rdf-syntax-ns#type _"/>

// lit, lang, and types
// <input name="http://purl.org/dc/terms/description @en"/>
// <input name="http://purl.org/dc/terms/created
//              ^http://www.w3.org/2001/XMLSchema#date"/>

// For the sake of completeness, although it likely won’t come
// up often in practice, the character to disambiguate plain
// literals is the apostrophe '

// subjects
// <form method="POST" action="http://example.com/my/resource">
//   <input type="text" name="http://example.com/other/resource
//                            http://purl.org/dc/terms/title"/>
//   <button>Set the Title</button>
// </form>

// graphs
// <input name="http://purl.org/dc/terms/title ' http://example.com/my/graph"/>
// This would be a rare instance in which you would encounter the need for the '
// designator, which you can naturally omit if you also specify a subject:
// <input name="http://example.com/other/resource
//              http://purl.org/dc/terms/title
//              http://example.com/my/graph"/>

// Statement Reversal
// <input name="! http://purl.org/dc/terms/creator"/>

// Add/Subtract

// The default behaviour is to merge relevant resources with the contents
// of the form, but if you want to delete statements, prepend with a -. +
// is a no-op for the default behaviour.
// <input name="- dct:title"/>

// Also consider = for "nuke all subject-predicate pairs of this kind and
// replace them with this value"
// <input name="= dct:title"/>

// Control Words
// TKTK

// Macro Expansions
// TKTK