const router = require('express').Router()
const activityController = require('../controller/activityController')



router.get('/error', (req,res) =>{

    res.render('error')
})

router.get('/', activityController.activityGetAll)

router.get('/ideas', (req,res) => {
    res.render('fikirPaylas')
})

router.post('/add', activityController.activityAdd)
router.post('/update', activityController.activityUpdate)
router.post('/delete', activityController.activityDelete)
router.post('/likeCount', activityController.likeCounter)



module.exports = router
