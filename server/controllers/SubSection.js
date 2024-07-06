const Subsection = require("../models/Subsection")
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async(req, res) =>{
   try{
    const{title, sectionId, duration, description}  = req.body;
    //extract video
   // const video = req.files.videoFile;

   console.log(title);

    //validation
    if(!title || !sectionId || !duration || !description){
        return res.status(200).json({
            message: "all the fields are required",
            success: false,
        })
    }

    //upload video
   // const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
    
    //create a subsection
    const subSectionDetails = await Subsection.create(
        {
            title: title,
            description: description,
            //videoUrl : uploadDetails,
            duration: duration,
        }
    )

    //push sbsection id in section
   
    console.log(typeof(sectionId));
    const updatedSection = await Section.findByIdAndUpdate(sectionId,
                                                           {
                                                            $push :{
                                                                subsection: subSectionDetails._id 
                                                            }
                                                           },{new : true}
    )

    return res.status(200).json({
        message: "subsection created successfully",
        success: true,
        subSectionDetails
    })
   }
   catch(error){
        return res.status(500).json({
            message: "error in creating a subsection , please try again",
            success: false,
            error: error
        })
   }
}


//updating a subsection
exports.updateSubSection = async(req, res) => {
    try{
          //fetch the data to change the section name
      const {subsectionName, subsectionId} = req.body;
      //validate
       if(!subsectionName || !subsectionId){
          return res.status(500).json({
              messsage: "please fill all the details ",
              success: false,
  
          })
      }
  
      //update data
      const subsection = await Subsection.findByIdAndUpdate(subsectionId, {title: subsectionName}, {new:true});
  
      //return response
  
      return res.status(200).json({
          message: "section updated successfully",
          success: true,
          subsection
      })
    }
    catch(error){
     return res.status(500).json({
         message: "erron in updating a subsection , please try again",
         success: false,
         error: error.message,
     })
 }
 
 }


 //delete subsection

exports.deleteSubSection = async(req, res) =>{
    try{
          //getid --> sending through params
     const subsectionId = req.query.subsectionId;
     console.log(subsectionId)
     //delete
     await Subsection.findByIdAndDelete(subsectionId)
     //return response
     return res.status(200).json({
         message: "section deleted successfully",
         success: true,
         
     })
    }
    catch(error){
     return res.status(500).json({
         message: "erron in deleting a section , please try again",
         success: false,
         error: error,
     })
 }
 }