const handleUploadImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();

    setFormData({
      ...formData,
      image: result.secure_url, // ✅ URL ảnh cloud
    });

    toast.success("Upload ảnh thành công!");
  } catch (err) {
    console.error(err);
    toast.error("Upload ảnh thất bại");
  }
};
