const activityModel = require('../models/activityModel')
const fs = require('fs')

const activityGetAll = async (req,res) => {
    try {
        
        const activityGetAll = await activityModel.find({})
        console.log(activityGetAll)

        return res.render('index' , {datas : activityGetAll})
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error
        })
    }
}


const bolum = {
    'yazilim' : "Yazılım Mühendisliği",    
    'havacilikveuzay' : "Havacılık ve Uzay Mühendisliği",
    'makine' :  "Makine Mühendisliği",                    
    'elektrik': "Elektrik / Elektronik Mühendisliği"                
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const categoryPhoto = {
    "spor" : "spor.png",
    "sanat" : "tiyatro.jpg",
    "turnuva" : "turnuva.png",
    "kulturel" : "kulturel.jpg",
    "muzik" : "muzik.jpg"
}

const activityAdd = async (req,res) => {
    console.log(req.body)
    try {

        let owner = Object.values(req.body).slice(0,4)
        owner[2]=bolum[owner[2]]

        const activityAdd = new activityModel({
            "activityTitle" : capitalizeFirstLetter(req.body.title),
            "category" : capitalizeFirstLetter(req.body.category),
            "photo" : categoryPhoto[req.body.category],
            "owner" : owner
        })

        await activityAdd.save()
            .then(() => {
                console.log("Başarılı")
                return res.redirect('/ideas')
            })
            .catch((err) => {
                return res.redirect('/error')
            })

    } catch (error) {
        return res.status(500).json({error})
    }
}

const activityUpdate = async (req,res) => {
    console.log(req.body)
    try {

        const activityUpdate = await activityModel.findByIdAndUpdate(req.body.id, {activityTitle : req.body.title, category: capitalizeFirstLetter(req.body.category), photo : categoryPhoto[req.body.category]})
        
        if(activityUpdate) {
            console.log("Başarılı")
            return res.redirect('/')
        }
        else {
            return res.redirect('/')
        } 

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Güncellenemedi"
        })
    }
}


const activityDelete = async (req,res) => {
    try {
        const activity = await activityModel.findById(req.body.id)
        console.log(activity)

        const activityDelete = await activityModel.findByIdAndDelete(req.body.id)
        if(activityDelete) {
            console.log("Başarıyla silindi")
            return res.redirect('/')
        }
        else return res.redirect('/')

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Silinemedi" + error
        })
    }
}

const likeCounter = async (req,res) => {
    console.log(req.body)
    try {
        var likeUpdate
        
        var activity = await activityModel.findById(req.body.id)

        if(activity.liked == false)
        {
            likeUpdate = await activityModel.findByIdAndUpdate(req.body.id, {likeCount : activity.likeCount + 1, liked: !activity.liked})
        }
        else {
            likeUpdate = await activityModel.findByIdAndUpdate(req.body.id, {likeCount : activity.likeCount - 1, liked: !activity.liked})
        }
       

        
        if(likeUpdate) {
            console.log("Başarılı")
            return res.redirect('/')
        }
        else {
            return res.redirect('/')
        } 

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    activityGetAll,
    activityAdd,
    activityUpdate,
    activityDelete,
    likeCounter
}