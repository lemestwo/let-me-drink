# let-me-drink

Version: 0.1.4

Auto 'Lein's Dark Root Beer' module for Tera Proxy

If you find any bug just let me know.

**Need _Command_ module by Pinkie to work.**

## Done
 * Uses Root Beer right after you use buff skills
 * Supported skills:
    * Deadly Gamble
    * Mana Boost
    * Shadow Reaping
    * Ragnarok
    * Blood Lust
    * Adrenaline Rush
    * Can add/remove in 'skills.js' file
 * Will only try to use if you have one or more beer in inventory
 * Can look in 'index.js' file to change:
    * Notifications in game
    * Delay to use beer after buff skill

## Commands
**Need to be used in _Proxy Channel_ (/proxy)**
```
/proxy letmedrink (Toggle the module on/off)
/proxy getskillinfo (see above)
```

## Recent updates
 * Support for Zerk buff
 * Command to get skill info

## How to get new skills information
 * Use the 'getskillinfo' command
 * See if it show the message: 'Use the desired skill and check proxy console.'
 * Use any skill you want in-game
 * See proxy console to get your infos