const File = require('../models/File')
const cloudinary = require('cloudinary').v2

//localfileupload handler function:
exports.localfileupload = async (req, res) => {
    try {
        //fetch file
        const file = req.files.file;
        console.log("file aaa gyo ", file);

        //create path where files need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`

        file.mv(path, (err) => {
            console.log(err)
        })

        res.json({
            success: true,
            message: "local file uploaded"
        })



    }

    catch (err) {
        console.log(err)

    }

}


function isFileTypeSupported(type, supportedType) {
    return supportedType.includes(type)
}

async function uploadFileToCloudinary(file, folder , quality) {
    const filenameWithoutExtension = file.name.split('.')[0];
    const options = {
        folder, 
        public_id: filenameWithoutExtension,
       
         // Add this line for video uploads
    };
    options.resource_type="auto";
    console.log("temp file name ", file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload handler:
exports.imageUpload = async (req, res) => {
    try {
        const {
            name, tags, email
        } = req.body;
        console.log(name, tags, email);
        const file = req.files.imageFile;
        console.log(file);

        //validation:
        const supportedTypes = ['jpg', 'png', 'jpeg'];

        const filetype = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(filetype, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "failed to validate"
            })
        }
        //file format supported hai :
        const response = await uploadFileToCloudinary(file, "imageuploader", file.name , 900);
        console.log(response)

        //save entry in database :
        console.log(req.body)
        const fileData = await File.create({ name, tags, email, imageUrl: response.secure_url })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "image uploaded successfully"
        })

    }
    catch (err) {
        console.log(err)
    }
}

//video uploader
exports.videoUpload = async (req, res) => {
    try {
        const {
            name, email, tags
        } = req.body;
        console.log(name, email, tags);

        const file = req.files.videoFile;
        //validation:
        const supportedTypes = ['mp4', 'gif', 'mov'];

        const filetype = file.name.split('.')[1].toLowerCase();

        if (!isFileTypeSupported(filetype, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "failed to validate"
            })
        }
        //file format supported hai :
        const response = await uploadFileToCloudinary(file, "imageuploader", file.name);
        console.log(response)

        //save entry in database :
        console.log(req.body)
        const fileData = await File.create({ name, tags, email, imageUrl: response.secure_url })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "image uploaded successfully"
        })



    }
    catch (err) {
        console.log(err)
    }


}


// //imagereducer function
// async function uploadToCloudinary(file, folder, filename, quality) {
//     const filenameWithoutExtension = filename.split('.')[0];
//     const options = {
//         folder,
//         public_id: filenameWithoutExtension,
//         resource_type: "image", // Explicitly set resource_type to image
//     };

//     if (quality) {
//         options.quality = quality.toString(); // Convert quality to string
//     }

//     console.log("temp file name ", file.tempFilePath);
//     return await cloudinary.uploader.upload(file.tempFilePath, options);
// }

// //image reducer
// exports.imageReducerUpload = async (req, res) => {
//     try {
//         const {
//             name, tags, email
//         } = req.body;
//         console.log(name, tags, email);
//         const file = req.files.imageFile;
//         console.log(file);

//         //validation:
//         const supportedTypes = ['jpg', 'png', 'jpeg'];

//         const filetype = file.name.split('.')[1].toLowerCase();

//         if (!isFileTypeSupported(filetype, supportedTypes)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "failed to validate"
//             })
//         }
//         //file format supported hai :
//         const response = await uploadToCloudinary(file, "imageuploader", file.name , 30);
//         console.log(response)

//         //save entry in database :
//         console.log(req.body)
//         const fileData = await File.create({ name, tags, email, imageUrl: response.secure_url })
//         res.json({
//             success: true,
//             imageUrl: response.secure_url,
//             message: "image uploaded successfully"
//         })

//     }
//     catch (err) {
//         console.log(err)
//     }
// }
