# RDF-KV.js

> Implements the [RDF-KV spec by Dorian Taylor](https://doriantaylor.com/rdf-kv) for converting HTML form post `FormBody` objects into RDF Triples.

## Usage

```
import rdfkv from 'rdf-kv.js'

const response = rdfkv(FormBody)
{
  delete: `<n-triples>`
  insert: `<n-triples>`
}
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
