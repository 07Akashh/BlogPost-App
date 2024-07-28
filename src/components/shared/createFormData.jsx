const CreateFormData = (formData) => {
    const data = new FormData();
    for (const key in formData) {
        if (formData[key]) {
            data.append(key, formData[key]);
        }
    }
    return data;
};

export default CreateFormData;
