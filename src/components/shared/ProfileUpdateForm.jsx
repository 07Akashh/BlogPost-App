import { capitalize } from "../utils/utils";
import Input from "./Input";
import ProfileImage from "./ProfileImage";
import SelectInput from "./SelectInput";
import Textarea from "./TextArea";

export const ProfileUpdateForm = ({ formData, handleChange, handleSubmit, uploading, handleImageClick, fileInputRef }) => (
    <form onSubmit={handleSubmit} className="flex  justify-center  flex-col">
        <ProfileImage
            previewImage={formData.profile_image}
            onClick={handleImageClick}
            fileInputRef={fileInputRef}
            handleChange={handleChange}
        />
        {['name', 'username'].map(field => (
            <Input
                type='text'
                key={field}
                name={field}
                value={formData[field]}
                handleChange={handleChange}
                placeholder={capitalize(field)}
            />
        ))}
        <Input
            type='email'
            name="email"
            value={formData.email}
            handleChange={handleChange}
        />
        <Input
            type='number'
            name="phone"
            value={formData.phone}
            handleChange={handleChange}
        />
        <Textarea
            name="bio"
            value={formData.bio}
            handleChange={handleChange}
        />
        <SelectInput
            name="gender"
            value={formData.gender}
            handleChange={handleChange}
            options={['Male', 'Female', 'Custom']}
        />
        <button type="submit" disabled={uploading} className="bg-blue-500 text-white py-2 px-4 rounded-md">
        {uploading ? 'Updating...' : 'Update Profile'}
        </button>
    </form>
);