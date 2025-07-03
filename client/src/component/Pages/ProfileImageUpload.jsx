import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SERVER_URL = import.meta.env.SERVER_URL;

const ProfileImageUpload = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Generate a preview of the image
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!image) {
      toast.error("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", image);

    try {
      setUploading(true);
      const response = await axios.post(
        `http://localhost:4000/user/upload-picture`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          Authorization: `Bearer ${import.meta.env.REACT_APP_CLOUDINARY_API_KEY}`,
        }
      );
      console.log(response);

      setImageUrl(response.data.imageUrl); // Save Cloudinary URL
      toast.success("Upload successful!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="text-center p-5">
      <h2>Upload Profile Picture</h2>

      {preview && (
        <img src={preview} alt="Preview" className="w-[150px] rounded-[50%]" />
      )}

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={imageUrl}
            alt="Uploaded Profile"
            className="w-[150px] rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default ProfileImageUpload;
