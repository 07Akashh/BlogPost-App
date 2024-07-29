const MediaInput = ({ previewMedia, onClick, fileInputRef, handleChange }) => (
    <div
        className="flex flex-col mx-auto sm:h-72 items-center gap-2.5 cursor-pointer"
        onClick={onClick}
    >
        {previewMedia ? (
            previewMedia instanceof File ? (
                previewMedia.type.startsWith('image/') ? (
                    <img
                        src={URL.createObjectURL(previewMedia)}
                        alt="Media Preview"
                        className="max-w-full max-h-72 sm:h-72 w-full rounded-lg object-cover"
                    />
                ) : (
                    <video
                        controls
                        src={URL.createObjectURL(previewMedia)}
                        className="max-w-full max-h-72 sm:h-72 w-full rounded-lg object-cover"
                    />
                )
            ) : previewMedia.startsWith('http') ? (
                <img
                    src={previewMedia}
                    alt="Media Preview"
                    className="max-w-full max-h-75 sm:h-72 w-full rounded-lg object-cover"
                />
            ) : (
                <video
                    controls
                    src={previewMedia}
                    className="max-w-full max-h-75  sm:h-72 w-full rounded-lg object-cover"
                />
            )
        ) : (
            <p className="text-sm text-gray-600 m-auto">Click to upload image or video</p>
        )}
        <input
            type="file"
            name="media"
            ref={fileInputRef}
            className="hidden"
            onChange={handleChange}
            accept="image/*,video/*"
        />
    </div>
);

export default MediaInput;
