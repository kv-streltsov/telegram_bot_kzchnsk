const easyvkInit = require('./vkinit.cjs')
const filterWall = require('./filterWall.cjs')
const vk = easyvkInit()

group_list = [-170319700,-42383055]

async function getWall() {

    let wall = {
        kzc:[],
        ens:[]
    }

    const listPromises = group_list.map(async element => {

        return vk.then(async vk => {    
            let wall_list = await vk.call('wall.get', {
                owner_id: element,
                count: 50})

                switch (element) {
                    //filter kzc.
                    case -170319700:
                        wall.kzc =  filterWall(wall_list,element)
                        break;

                     //filter ens.
                    case -42383055:
                        wall.ens =  filterWall(wall_list,element)
                        break;
                }
        }) 
    });

    return Promise.all(listPromises).then(() => wall)
}
 
module.exports = getWall;