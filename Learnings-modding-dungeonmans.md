# Learnings modding Dungeonmans

- Namespace your mod
  - use a prefix for every single entity, e.g. if you mod is named Crushing More Bestest use the prefix `cmb_` for every entity.
- Unique entity names
  - This avoids hard-to-fix bugs with your mod. Tipp: You can prefix or suffix each entity by folder, for example, entities in `spritedata/` could always start with `sprite_`.
- Ingame Console
  - [Docs](https://dungeonmans.fandom.com/wiki/Mod_Packages) on how to enable the ingame console in Dungeonmans
  - Spawn monsters using `spawn <monstername>`
    - if you namespaced your mod, you can use `spawn <prefix>` and it will list all your monsters!
    - In general, typing `spawn <first few letters>` gives you a list of suggested monsters that contain those letters.
    - Spawn your mod monsters with the console open. The console may print some error message to help you debug.
