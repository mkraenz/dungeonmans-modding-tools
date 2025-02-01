# Schemas

TypeScript type defintions and [JSON schemas](https://json-schema.org/) for chosen Dungeonmans objects to improve the Dungeonmans modding developer experience with early schema validation feedback and autocompletion.

## Caveats

Unfortunately, json schema allows only static validation but not dynamic validation by other enum values, see [stackoverflow](https://stackoverflow.com/questions/57705601/json-schema-only-allow-existing-keys-as-value-in-another-object), this [github issue](https://github.com/json-schema-org/json-schema-spec/issues/331), this [other github issue](https://github.com/json-schema-org/json-schema-spec/issues/855). This limits the amount of things that can be validated on a pure JSON schema level. Such 'dynamic enums' would need to be checked with some other tool.

## Building

```sh
nx run schemas:jsonschema:gen
```

You can also build individual ones using the respective npm scripts in [package.json](./package.json), for example

```sh
nx run schemas:jsonschema:gen:actors:monster
```

## Noteworthy things about ts-json-schema-generator

- If you want to include a type/schema as a `$ref` then `export` the typescript type. Without the `export` the generator will inline its definition.
