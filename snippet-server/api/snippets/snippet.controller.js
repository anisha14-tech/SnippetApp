const Snippet = require('./snippet.model');

const util = require('../util');

const getSnippets = async (req, res) => {
    const { query } = req;
    const language = query.language;

    let filter = {};
    if (language) {
        filter = { programming_language: { $regex: language, $options: 'i' } };
    }

    try {
        const snippets = await Snippet.find(filter);
        res.json(snippets);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: toString() });
    }
}

const getSnippetById = async (req, res) => {
    const { params, query } = req;
    const id = params.id;

    const includeBookmarkCount = util.queryToBoolean(query.bookmarkCount);

    let snippet = null;

    try {
        if (includeBookmarkCount) {
            snippet = await Snippet.findOne({
                _id: id
            }).populate('bookmarks');
        } else {
            snippet = await Snippet.findOne({ _id: id });
        }

        if (snippet){
            res.json(snippet);
        } else {
            res.status(404).json({ error: `No snippet found by id: ${id}` });
        }
    } catch (error) {
        res.status(500).json({ error: toString() });
    }
}

const createSnippet = async (req, res) => {
    const { body } = req;
    delete body.created;
    try {
        const snippetDoc = new Snippet(body);
        const snippet = await snippetDoc.save();
        res.json(snippet);
    } catch(error) {
        res.status(500).json({ error: error.toString() });
    }
}

const deleteSnippet = async (req, res) => {
    const { params } = req;
    const id = params.id;

    try {
        const snippet = await Snippet.findOneAndDelete({ _id: id });
        if (snippet) {
            res.json({ message: 'success', snippet: snippet._id });
        } else {
            res.status(404).json({ error: `No snippet found by id: ${id}` });
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

module.exports = {
    getSnippets,
    getSnippetById,
    createSnippet,
    deleteSnippet
};