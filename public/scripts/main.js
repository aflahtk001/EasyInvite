const uploadedImages = [];

const widget =
    cloudinary.createUploadWidget({
        cloudName: window.cloudinaryConfig.cloudName,
        uploadPreset: window.cloudinaryConfig.uploadPreset,
        multiple: true
    }, (error, result) => {
        if (
            !error &&
            result &&
            result.event === "success"
        ) {
            uploadedImages.push(
                result.info.secure_url
            );

            document
                .getElementById("imageUrls")
                .value =
                JSON.stringify(uploadedImages);

            console.log(
                document
                    .getElementById("imageUrls")
                    .value
            );

            const img =
                document.createElement("img");

            img.src =
                result.info.secure_url;

            img.width = 180;

            document
                .getElementById("image-preview-container")
                .appendChild(img);

            document
                .getElementById("upload-status")
                .innerText =
                uploadedImages.length +
                " image uploaded successfully";
        }

    });
document
    .getElementById("upload_widget")
    .addEventListener("click", function () {

        widget.open();

    });
