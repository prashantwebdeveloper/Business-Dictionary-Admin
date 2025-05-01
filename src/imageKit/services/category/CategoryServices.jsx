import { imageKitConfig } from "../../ImageKitConfig";

// Category
// Get-Image
export const GetCategoryImageKit = async () => {
    try {
        const res = await imageKitConfig.listFiles({ path: '/category', limit: 10 });
        console.log("GetCategory-ImageKit++", res);

        if (res?.$ResponseMetadata?.statusCode === 200) {
            // const images = res?.files || [];
            return res;
        }
    } catch (err) {
        console.error('Error-GetCategory-ImageKit--', err);
    }
}


// Post-Image
export const PostCategoryImageKit = async (imagefile) => {
    try {
        const fileName = `${imagefile.name}_${Date.now()}`;
        const imgParams = {
            file: imagefile,
            fileName: fileName,
            folder: '/category/',
            tags: [],
        }

        const res = await imageKitConfig.upload(imgParams);
        console.log("PostCategory-ImageKit++", res);

        if (res?.$ResponseMetadata?.statusCode === 200) {
            return res; 
        }
    } catch (err) {
        console.error('Error-PostCategory-ImageKit--', err);
    }
}


//  Delete-Image
export const DeleteCategoryImageKit = async (imageId) => {
    try {
        const res = await imageKitConfig.deleteFile(imageId);
        console.log("DeleteCategory-ImageKit++", res);

        if (res?.$ResponseMetadata?.statusCode === 204) {
            return res;
        }
    } catch (err) {
        console.error('Error-DeleteCategory-ImageKit--', err);
    }
}
