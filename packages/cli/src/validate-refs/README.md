# Validate Refs

## Motivation

There are many string values in Dungeonmans that are not references, like a monster's name or a dialog message. Those properties are just plain text.

I do not know the full list of property names of entities that Dungeonmans interprets as references, so hardcoding a list of property names, and using that to automatically determine that some string value should be interpreted as a reference is too high effort.

Neither JSON nor entitydef plain text files have any concept of references. All we have are string values.

## Conclusion

We are going for a

- user-land marking approach
- that is fairly simple
- and timely to implement
- and when combined with other techniques like namespacing by entity type
- provides valuable feedback
- without the need to run the actual game.

### Reasoning

By leaving the decision whether something should be interpreted as a reference or as a plain text string to the mod creators, we gain lots of flexibility for fairly little effort on the user side.

`@ref_` is the default prefix to identify whether a string value is to be interpreted as a reference.

In effect, you could say we are adding a 'custom data type' to JSON that is identified by its prefix.

## Benefit

Having this 'custom data type' of Reference allows us to run additional logic on these. This currently means we can check whether your references actually match an existing entity.

## Out-of-scope

### References should point to entities of a specific type not just any entity

In reality, references not only need to match _some_ entity name, but often an entity of a specific type. For example, a monster's `sprite` is a reference to an entity inside `spritedata/`. However, our current approach does not know about the `spritedata/` part. Instead, as long as _any_ entity with that name exists - even if that entity is, say, another monster - the validation will not error/warn.

To implement this, again, the ideal would be a predetermined list of property keys. Then we could completely get rid of the `@ref_` approach and just handle each, say, `monster.sprite` as a `SpriteReference` and check only entities of type `sprite`. That level of knowledge however is not existent - except for the original creator of Dungeonmans presumably.

So we simply. And on closer inspection, the tradeoffs we have should be acceptable. In particular, when combined with namespacing types of entities (e.g. all your sprite entities end with `_sprite`), the current approach should be an effective and reliable approach.

### References to vanilla Dungeonmans entities

Again, this boils down to having a list of all vanilla Dungeonmans entities at hand. Creating that list is not necessarily hard as everything is in plain text entitydef format, but certainly annoying and also somewhat brittle.

For the time being, we accept this. It is probably still worth marking references to vanilla Dungeonmans entities using `@ref_` for the future in which we have the full list of vanilla Dungeonmans entities.

On that note, getting such a list is probably mainly a question of running the existing (and presumably working) Lexer on the original game files, and then defining just a minimum of grammar to grab the string after `entitydef`. This plus fixing the remaining quirks t hat the Lexer did not expect manually (or fixing the Lexer) should provide the list.

### References to code files or textures

This is another instance of where it becomes imminent that references need a type. Our current approach looks for entities, so for example a sprite entity's `texturename` property will never be identified as existent entity, because `texturename` is the name of a `.png` file and not an entity.

References to code has the same flaw with our current approach to references.

## References in property names

Some entity types require you to use the name of an entity as a property name instead of its value. These are currently not being checked, so use the plaintext version without `@ref_`.

Examples include entities in `encounterdata/` and `tabledata/`.
