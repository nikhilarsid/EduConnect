const Tag = require("../models/Tags")


exports.createTag = async(req,res) =>{
    try{
        const{name , description} = req.body;
        //validation
        if(!name || ! description){
            return res.status(500).json({
                message: "all the fields are required",
                success: false,
            })
        }

        //create tag
        const tagDetails = await Tag.create({
            name: name,
            description: description,
        })
        console.log(tagDetails);

        return res.status(200).json({
            message: " tag created successfullly",
            success: true,
        })
    }

    catch{
        return res.status(500).json({
            message: 'error encountered in creating a tag',
            success : false
        })
    }
}

//get all tags function

exports.showAlltags = async(req, res)=>{
    try{
        const allTags = await Tag.find({}, {name: true, description: true});
    return res.status(200).json({
        message: "all tags returned successfully ",
        success: true,
        allTags,
    })
    }
    catch{
        return res.status(500).json({
            message: "error in getting all the tags",
            success: false,
        })

    }
}