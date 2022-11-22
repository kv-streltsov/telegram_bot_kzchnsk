const dateConverter = require('./dateConvert.cjs')
const postSort = require('./sortPost.cjs')

const easyvk = require('easyvk')
const path = require('path');



function getRide(){
    return new Promise((resolve, reject) => {
        let rideData = {}
        let ride_list = []

        easyvk({
            username: '89059971441',
            password: '3230sas',
            sessionFile: path.join(__dirname, '.my-session')
        })
        .then(async vk => {
            let vkr = await vk.call('wall.get', {
                owner_id: -170319700,
                count: 50});
            
            let post_list = postSort(vkr)

           
            let interval = 600
            let promise = Promise.resolve();

            post_list.forEach((element,index) => {
                  promise = promise.then(()=>{

                        let user_get = vk.call('users.get', {
                            user_ids: element.signer_id,
                            fields: ['domain']});
                            
                        user_get.then(value =>{

                            try {
                                rideData = {
                                    text : element.text,
                                    date : dateConverter(element.date),
                                    signer : value[0].domain
                                }
                            } catch (error) {
                                console.log(error)
                            } finally{
                                ride_list.push(rideData)
                            }                                
                        })

                        return new Promise(resolve => {
                            setTimeout(resolve, interval);
                        });
                  })
              });

            promise.then(()=>{
                resolve(ride_list)  
            })
        })
    })
}

module.exports = getRide;







