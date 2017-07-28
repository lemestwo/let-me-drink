/**
 * Version: 0.1.3
 * Made by Loggeru
 */

const LAIN_ID = 80081,                          // Lein's Dark Root Beer ID
    DELAY = 200,                                // How much time in miliseconds should wait after buff (seconds * 1000)
    NOTIFICATIONS = true;                       // true - Activates notification when you drink / false - Deactivates

/**
 * DON'T CHANGE ANYTHING BELOW THIS LINE
 */

const skills = require('./skills'),
    Command = require('command');

module.exports = function LetMeDrink(dispatch) {
    const command = Command(dispatch);

    let enabled = true,
        oCid = null,
        oJob = null,
        oX = null,
        oY = null,
        oZ = null,
        oW = null,
        qtdDrink = 0,
        idDrink = null,
        isCdDrink = false,
        getInfoCommand = false;

    command.add('letmedrink', () => {
        enabled = !enabled;
        let txt = (enabled) ? 'ENABLED' : 'DISABLED';
        message('Let me Drink is ' + txt, true);
    });

    command.add('getskillinfo', () => {
        getInfoCommand = true;
        message('Use the desired skill and check proxy console.', true);
    });

    dispatch.hook('S_LOGIN', 2, (event) => {
        oCid = event.cid;
        oJob = (event.model - 10101) % 100;
    });

    dispatch.hook('C_PLAYER_LOCATION', 1, { order: -10 }, (event) => {
        oX = (event.x1 + event.x2) / 2;
        oY = (event.y1 + event.y2) / 2;
        oZ = (event.z1 + event.z2) / 2;
        oW = event.w;
    });

    dispatch.hook('S_INVEN', 5, { order: -10 }, (event) => {
        if (!enabled) return;

        let tempInv = event.items;
        for (i = 0; i < tempInv.length; i++) {
            if (tempInv[i].item == LAIN_ID) {
                qtdDrink = tempInv[i].amount;
                idDrink = tempInv[i].uid.low;
                break;
            }
        }
    });

    dispatch.hook('S_START_COOLTIME_ITEM', 1, event => {
        if (event.item == LAIN_ID && isCdDrink == false) {
            isCdDrink = true;
            setTimeout(function () { isCdDrink = false; }, event.cooldown * 1000);
        }
    });

    dispatch.hook('C_START_SKILL', 3, { order: -10 }, (event) => {
        if (!enabled) return;

        let sInfo = getSkillInfo(event.skill);

        if (getInfoCommand) {
            message('Skill info: (group: ' + sInfo.group + ' / job: ' + oJob + ')');
            getInfoCommand = false;
        }

        for (s = 0; s < skills.length; s++) {
            if (skills[s].group == sInfo.group && skills[s].job == oJob && isCdDrink == false && qtdDrink > 0) {
                useItem();
                break;
            }
        }
    });

    function useItem() {
        setTimeout(function () {
            dispatch.toServer('C_USE_ITEM', 1, {
                ownerId: oCid,
                item: LAIN_ID,
                id: idDrink,
                unk1: 0,
                unk2: 0,
                unk3: 0,
                unk4: 1,
                unk5: 0,
                unk6: 0,
                unk7: 0,
                x: oX,
                y: oY,
                z: oZ,
                w: oW,
                unk8: 0,
                unk9: 0,
                unk10: 0,
                unk11: 1
            });
            isCdDrink = true;
            qtdDrink--;
            if (NOTIFICATIONS) message('You drank your beer, still have ' + qtdDrink + ' more.', true);
            setTimeout(function () { isCdDrink = false; }, 60000);
        }, DELAY);
    }

    function getSkillInfo(id) {
        let nid = id -= 0x4000000;
        return {
            id: nid,
            group: Math.floor(nid / 10000),
            level: Math.floor(nid / 100) % 100,
            sub: nid % 100
        };
    }

    function message(msg, chat = false) {
        if (chat == true) {
            command.message('(Let Me Drink) ' + msg);
        } else {
            console.log('(Let Me Drink) ' + msg);
        }
    }
}