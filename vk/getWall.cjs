const logFnc = require('../log/log')
const filterWall = require('./filterWall.cjs')

// const easyvkInit = require('./vkinit.cjs')
// const vk = easyvkInit()

group_list = [-170319700, -42383055]

module.exports = async function getWall(vk) {

    let wall = {
        kzc: [],
        ens: []
    }

    const listPromises = group_list.map(async element => {

        return vk.then(async vk => {
            let wall_list = await vk.call('wall.get', {
                owner_id: element,
                count: 50
            })

            logFnc(`GET WALL ${element}`)
            switch (element) {
                //filter kzc.
                case -170319700:
                    wall.kzc = filterWall(wall_list, element)
                    break;

                //filter ens.
                case -42383055:
                    wall.ens = filterWall(wall_list, element)
                    break;
            }
        }).catch(err => {
            console.log(err)
            logFnc(`GET WALL ERROR====${err.message}`)})
    });

    
    logFnc(`RETURN WALL`)
    return Promise.all(listPromises).then(() => wall)
}