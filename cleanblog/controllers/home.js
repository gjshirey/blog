const BlogPost = require('../models/BlogPost.js')
const user = require('../models/User.js')

module.exports = async (req, res) => {
    const blogposts = await BlogPost.find({}).populate('userid')
    const currentUser = await user.findById(req.session.userID)
    console.log(currentUser)
    res.render('index', {
        blogposts,
        currentUser
    })
}