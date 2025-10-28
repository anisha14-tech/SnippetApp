const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        snippet_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Snippet' }
    }
);

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

module.exports = Bookmark;
