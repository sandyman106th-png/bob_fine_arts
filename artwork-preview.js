const artworkImages = document.querySelectorAll("table img");
const preview = document.createElement("dialog");
const previewImage = document.createElement("img");
const closeButton = document.createElement("button");

preview.className = "artwork-preview";
preview.setAttribute("aria-label", "Artwork preview");
previewImage.className = "artwork-preview-image";
closeButton.className = "artwork-preview-close";
closeButton.type = "button";
closeButton.textContent = "Close";
closeButton.setAttribute("aria-label", "Close artwork preview");
preview.append(closeButton, previewImage);
document.body.append(preview);

function openPreview(image) {
    previewImage.src = image.currentSrc || image.src;
    previewImage.alt = image.alt;
    preview.showModal();
}

for (const image of artworkImages) {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `View larger image: ${image.alt}`);
    const link = image.closest("a");
    if (link) {
        link.replaceWith(image);
    }
    image.addEventListener("click", (event) => {
        event.preventDefault();
        openPreview(image);
    });
    image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPreview(image);
        }
    });
}

closeButton.addEventListener("click", () => preview.close());
preview.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        preview.close();
    }
});
preview.addEventListener("cancel", (event) => {
    event.preventDefault();
    preview.close();
});
preview.addEventListener("click", (event) => {
    if (event.target === preview) {
        preview.close();
    }
});
