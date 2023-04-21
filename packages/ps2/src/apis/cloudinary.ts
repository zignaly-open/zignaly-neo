export const uploadImage = async (file: File, presset = 'xiammksy') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', presset);

  const response = await fetch(
    'https://api.cloudinary.com/v1_1/zignaly/image/upload',
    {
      method: 'POST',
      body: formData,
    },
  );
  return response.json();
};
