const User = require('../models/User')

module.exports = {
    listChildren: async (req,res) => {
        try {
            const user = req.user
            const parent = req.user.id
            const children = await module.exports.findChildren(parent)
            const childrenIds = children.map(el => [el._id.valueOf(), el.firstName, el.lastName])
            console.log(`parent and childIds = `, parent, childrenIds)
            res.render('parentPortal.ejs', { user: user, children: childrenIds })
        }
        catch(err) {
            console.log(err)
        }
    },
    findChildren: async (parent) => {
        let userChildren = await User.find( { childOf: parent })
        return userChildren
    }
}
