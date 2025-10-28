const mongoose = require('mongoose');

const SnippetSchema = new mongoose.Schema(
    {
        title: String,
        code_snippet: String,
        programming_language: String,
        created: {
            type: Date,
            default: Date.now
        },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    },
    {
        toObject: { virtuals: true },
        toJSON: { virtuals: true }
    }
);

SnippetSchema.post('findOneAndDelete', async function(doc){
    const Bookmark = mongoose.model('Bookmark');

    try {
        await Bookmark.deleteMany(
            { snippet_id: doc._id }
        );
        console.log('Success deleting associated bookmarks');
    } catch (error) {
        console.log('Error deleting associated bookmarks');
    }
});

SnippetSchema.virtual('bookmarks', {
    ref: 'Bookmark',
    localField: '_id',
    foreignField: 'snippet_id'
});

const Snippet = mongoose.model('Snippet', SnippetSchema);

module.exports = Snippet;
