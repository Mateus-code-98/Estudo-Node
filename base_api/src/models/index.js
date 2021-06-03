const User = require('./userModel')
const Post = require('./postModel')

User.hasMany(Post)
Post.belongsTo(User)

module.exports = { User, Post }