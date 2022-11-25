// const { default: user } = require('../login.js')
const dateConverter = require('./dateConvert.cjs')
const getWall = require('./getWall.cjs')
const easyvkInit = require('./vkinit.cjs')
const vk = easyvkInit()



async function getRide(){

    let objectPost = {
        kzc:[],
        ens:[]
    }

    let list1
    let list2

    let objectWall = await getWall()
    console.log(objectWall.ens.length,objectWall.kzc.length)

    for (key in objectWall){
        
        switch (key) {
            case 'kzc':

                objectWall.kzc.map((element,index) => {
                    setTimeout(() => {

                        vk.then(async vk => {
                            console.log(index + 'k')
                            let user_domain = await vk.call('users.get', {
                                user_ids: element.signer_id,
                                fields: ['domain']});
                            

                            try {
                                rideData = {                                
                                    text : element.text,
                                    date : dateConverter(element.date),
                                    signer : user_domain[0].domain
                                }
                                
                            } catch (error) {
                                console.log(error)
                            } finally {
                                objectPost.kzc.push(rideData)
                            }
                        })

                    }, 400 * index);
                })

                break;
        
            case 'ens':

                    list2 = objectWall.ens.map((element,index) => {

                    setTimeout(() => {

                        return    vk.then(async vk => {
                            console.log(index  + 'e')
                            
                            let user_domain = await vk.call('users.get', {
                                user_ids: element.from_id,
                                fields: ['domain']});
    
                            
                            try {
                                rideData = {                                
                                    text : element.text,
                                    date : dateConverter(element.date),
                                    signer : user_domain[0].domain
                                }
                            } catch (error) {
                                console.log(error)
                            } finally {
                                objectPost.kzc.push(rideData)
                            }
                        })
                    }, 400 * index);
                    

                })

                break;
        }
        
    }
    return Promise.all(list1,list2).then(() => objectPost)
    
}
    console.log(1)

   


let a = getRide()
a.then(x=>console.log(x))