const router = require('express').Router(); //Direclty generate a router

const imageThumbnail = require('image-thumbnail');
const userService = require('../services/userService.js');
const { isUser } = require('../middlewares/routeGuardMiddleware.js');
const upload = require('../configurations/multerConfig.js');
const auth = require('../services/authenticationService');
const fbService = require('../services/firebaseService.js');
const { parseError } = require('../utils/mongooseErrorParser.js');

router.get('/follow/:username', isUser, async (req, res) => {
    try {
        const followed = await userService.follow(req.params.username, req.user._id);
        await userService.pushToField(req.user._id, followed._id, 'following');
        res.status(200).json({ message: 'followed' });
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/unfollow/:username', isUser, async (req, res) => {
    try {
        const followed = await userService.unfollow(req.params.username, req.user._id);
        await userService.removeFromField(req.user._id, followed._id, 'following');
        res.status(200).json({ message: 'unfollowed' });
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/get/:username', async (req, res) => {
    try {
        const user = await userService.getAndPopulate(req.params.username, [{ path: 'submissions' }, { path: 'favourites', populate: { path: 'author' } }]);
        if (!user) return res.status(404).json({ msg: 'Not found' });
        user.submissions.forEach(x => x.author = { username: user.username, avatar: user.avatar });
        user.submissions.sort((a, b) => b.createdAt - a.createdAt);
        user.favourites.forEach(x => x.author = { username: x.author.username, avatar: x.author.avatar });
        user.favourites.reverse();
        delete user.password;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error })
    }
}
)
router.get('/getSmall/:id', async (req, res) => {
    try {
        const user = await userService.getOne(req.params.id)
        const toReturn = { username: user.username, avatar: user.avatar }
        res.status(200).json(toReturn);
    } catch (error) {
        res.status(500).json({ error })
    }
}
)
router.get('/getById/:id', async (req, res) => {
    try {
        const user = await userService.getOne(req.params.id)
        delete user.password;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error })
    }
})
router.put('/profile/settings', isUser, upload.single('avatar'), async (req, res) => {
    try {
        if (req.file) {
            const fileType = req.file.mimetype.split('/')[1];
            const fileName = `${Date.now().toString().slice(7, 12)}.${fileType}`
            const filepath = `avatars/${req.user.username}/${fileName}`;
            const thumbnail = await imageThumbnail(req.file.buffer, { height: 200 });
            await fbService.file(filepath).save(thumbnail);
            req.body.avatar = `https://firebasestorage.googleapis.com/v0/b/fanart-central.appspot.com/o/avatars%2F${req.user.username}%2F${fileName}?alt=media`
        }
        let user = await userService.updateOne(req.user._id, req.body);
        delete user.password;
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;