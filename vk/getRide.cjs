const dateConverter = require('./dateConvert.cjs')
const getWall = require('./getWall.cjs')
// const easyvkInit = require('./vkinit.cjs')
// const vk = easyvkInit()




async function getRide(vk){
    
    let objectPost = {
        kzc:[],
        ens:[]
    }


    const objectWall = await getWall(vk)

    const kzc_list = objectWall.kzc
    const ens_list = objectWall.ens


    const list_promises_kzc = kzc_list.map(async (element,index) =>{
        setTimeout(() => {
            return vk.then(async vk => {
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
        }, 400*index);

    })

    const list_promises_ens = ens_list.map(async (element,index) =>{
        setTimeout(() => {
            
            return vk.then(async vk => {
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
                    objectPost.ens.push(rideData)
                }
            })

        }, 400*index);
        

    })

    return Promise.all(list_promises_kzc,list_promises_ens)
        .then(() => objectPost)
}

module.exports = getRide;
