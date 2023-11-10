import {v2 as cloudinary} from "cloudinary";

cloudinary.config({
    cloud_name:'dx5cleujx',
    api_key:'165534426888939',
    api_secret:'Bkas882gaKf_EJqifwhXH3go_jQ'
})
export const  uploadContract= async filepath =>{
    return await cloudinary.uploader.upload(filepath,{
        folder:'contracts',
        resource_type: 'raw',
        transformation: [{ format: 'pdf' }],
        flags: 'attachment:contrato'
    })
}

export const downloadPDF = async public_id => {
    try {
        const publicId = public_id;
        const url = cloudinary.url(publicId, {
            transformation: [{ format: 'pdf' }, { flags: 'attachment' }],
          });
        return(url)
      } catch (error) {
        console.error(error);
      }
  };

