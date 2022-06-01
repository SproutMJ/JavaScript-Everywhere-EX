module.exports={
    author: async (note, args, {models})=>{
        return await models.User.findById(note.author)
    },
    favoritedBy: async (user, args, {models})=>{
        return await  models.User.find({_id: {$in: note.favoritedBy}})
    },
    notes: async (user, args, {models})=>{
        return await models.Note.find(({author: user._id})).sort({_id: -1})
    },
    favorites: async (user, args, {models})=>{
        return await  models.Note.find({favoritedBy: user._id}).sort({_id: -1})
    },
}