const router = require('express').Router(); //Direclty generate a router
const { default: slugify } = require('slugify');
const upload = require('../configurations/multerConfig.js');
const imageThumbnail = require('image-thumbnail');
const submissionService = require('../services/submissionService.js');
const { isUser } = require('../middlewares/routeGuardMiddleware.js')
const fbService = require('../services/firebaseService.js');
const sizeOf = require('image-size');
const userService = require('../services/userService.js');

router.get('/', async (req, res) => {
    try {
        let queryParams = {}
        let skip = 0
        if (req.query.sortBy) {
            req.query.sortBy === 'newest' ? queryParams.createdAt = 'desc' : queryParams.views = 'desc';
        }
        if (req.query.page) {
            skip = parseInt(req.query.page) * 20;
        }
        const submissions = await submissionService.getAll(queryParams, skip, 20);

        submissions.forEach(x => x.author = { username: x.author.username, avatar: x.author.avatar });
        res.status(200).json(submissions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})
router.get('/favourite/:id', isUser, async (req, res) => {
    try {
        await submissionService.favourite(req.params.id, req.user._id, 'favourites');
        await userService.pushToField(req.user._id, req.params.id, 'favourites');
        res.status(200).json({ ok: 'favourited' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})
router.get('/unfavourite/:id', isUser, async (req, res) => {
    try {
        await submissionService.unfavourite(req.params.id, req.user._id, 'favourites');
        await userService.removeFromField(req.user._id, req.params.id, 'favourites');
        res.status(200).json({ ok: 'unfavourited' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})

router.get('/feed', isUser, async (req, res) => {
    try {
        let sortParams = {};
        req.query.sort.toLowerCase() === 'oldest' ? sortParams.createdAt = 'asc' : sortParams.createdAt = 'desc';
        const user = await userService.getOne(req.user._id);
        const submissions = await submissionService.getAllMatching(user.following, sortParams);
        submissions.forEach(x => x.author = { username: x.author.username, avatar: x.author.avatar });
        res.status(200).json(submissions);

    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/category/:tag', async (req, res) => {
    let sortParams = {};
    req.query.sortBy.toLowerCase() === 'oldest' ? sortParams.createdAt = 'asc' : sortParams.createdAt = 'desc';
    try {
        const submissions = await submissionService.getTagged(req.params.tag.toLowerCase(), sortParams);
        submissions.forEach(x => x.author = { username: x.author.username, avatar: x.author.avatar });
        res.status(200).json(submissions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})

router.get('/search', async (req, res) => {
    let searchParams = {};
    let sortParams = { createdAt: 'asc' };
    const regex = new RegExp(req.query.q, 'i');
    searchParams['$or'] = [{ title: { $regex: regex } }, { category: { $regex: regex } }];
    //req.query.sort.toLowerCase() === 'oldest' ? sortParams.createdAt = 'asc' : sortParams.createdAt = 'desc';
    try {
        const submissions = await submissionService.searchAll(searchParams, sortParams);
        submissions.forEach(x => x.author = { username: x.author.username, avatar: x.author.avatar });
        res.status(200).json(submissions);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})

router.get('/random', async (req, res) => {
    try {
        const submission = await submissionService.getRandom();
        const author = await userService.getOne(submission[0].author);
        const constructedObject = {
            title: submission[0].title,
            imageUrl: submission[0].imageUrl,
            slug: submission[0].slug,
            author: {
                username: author.username,
                avatar: author.avatar
            }
        }
        res.status(200).json(constructedObject);
    } catch (error) {
        res.status(500).json({ error })
    }
})
router.delete('/:id', isUser, async (req, res) => {
    try {
        await submissionService.deleteOne(req.params.id, req.user._id);
        await userService.removeFromField(req.user._id, req.params.id, 'submissions');
        res.status(200).json({ ok: 'deleted item' });
    } catch (error) {
        res.status(500).json({ error })
    }
})
router.post('/', isUser, upload.single('image'), async (req, res) => {
    try {
        let count = await submissionService.getCount();
        req.body.author = req.user._id;
        req.body.slug = slugify(req.body.title, { lower: true, strict: true, trim: true }) + `-${Date.now().toString().slice(7, 12)}${count + 1}`;
        req.body.ingredients = JSON.parse(req.body.ingredients);

        const thumbnail = await imageThumbnail(req.file.buffer, { height: 300 });
        const dimensions = sizeOf(thumbnail);

        const fileName = `${req.body.slug}.${dimensions.type}`;
        const thumbName = `${req.body.slug}_thumb.${dimensions.type}`;

        await fbService.file(`cooking/${req.user.username}/${fileName}`).save(req.file.buffer);
        await fbService.file(`thumbs/${req.user.username}/${thumbName}`).save(thumbnail);
        req.body.imageUrl = `https://firebasestorage.googleapis.com/v0/b/fanart-central.appspot.com/o/cooking%2F${req.user.username}%2F${fileName}?alt=media`;
        req.body.thumbUrl = `https://firebasestorage.googleapis.com/v0/b/fanart-central.appspot.com/o/thumbs%2F${req.user.username}%2F${thumbName}?alt=media`;
        const sub = await submissionService.create(req.body);
        userService.pushToField(req.user._id, sub._id, 'submissions');
        res.status(201).json(sub)
    } catch (error) {
        res.status(500).json({ error })
        console.log(error);
    }
})
router.patch('/:id', isUser, async (req, res) => {
    try {
        req.body.slug = `${slugify(req.body.title, { lower: true, strict: true, trim: true })}-${req.body.slug.split('-').slice(-1)[0]}`;
        req.body.tags = JSON.parse(req.body.tags);
        let sub = await submissionService.updateOne(req.params.id, req.user._id, req.body);
        sub.author = { username: sub.author.username, avatarUrl: sub.author.avatar, followers: sub.author.followers };
        res.status(200).json(sub);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})
router.get('/:author/recipe/:slug', async (req, res) => {
    try {
        const submission = await submissionService.getOne(req.params.slug);
        if (!submission) {
            return res.status(404).json({ msg: 'Not found' })
        }
        if (submission.author.username != req.params.author) {
            throw new Error('Different author');
        }
        submission.author = { username: submission.author.username, avatar: submission.author.avatar, followers: submission.author.followers };
        submissionService.updateViews(submission._id);
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router;