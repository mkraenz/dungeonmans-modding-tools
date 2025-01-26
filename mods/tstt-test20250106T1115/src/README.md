# tstt-test20250106T1115

This directory was initialized with `pnpm run init:mod mods/tstt-test20250106T1115`.

You can now add json files to add monsters, dungeons, etc inside the `src/` directory.  
If you have the dungeonmans json schemas set up, you should get autocompletion and type validation, too.

If you prefer to write entityDefs instead, you can do that as well by writing them as usual `.txt` files inside the `src/` directory.

Once you want to test your mod in the game, you build your mod into formats that Dungeonmans understands with

```sh
# build the mod
pnpm run build:mod mods/tstt-test20250106T1115/src mods/tstt-test20250106T1115/dist
```

> Details: `.txt` files will be copied over as-is. `.json` files will be turned into entitydefs inside `.txt` files. The only exception being plotdata files. Those just stay in json format because Dungeonmans supports plotdata jsons natively.

Finally, manually copy the `dist` directory as-is to the dungeonmans mod folder `c:\users\[you]\appdata\roaming\Dungeonmans\modcontent\mods` and rename the `dist` directory into `tstt-test20250106T1115`.
