const $elementGallery = document.querySelector(".photographer-page__gallery");

/**
 * Filter media gallery with select option params
 * @param {Array} mediaGallery
 * @param {String} option
 * @returns {Array} - return a sorted media array
 */
const filterByOption = (mediaGallery, option) => {
	switch (option) {
		case "popularity":
			return mediaGallery.sort((a, b) => {
				return b.likes - a.likes;
			});
		case "date":
			return mediaGallery.sort((a, b) => {
				return new Date(b.date) - new Date(a.date);
			});
		case "title":
			return mediaGallery.sort((a, b) => a.title.localeCompare(b.title));
		default:
			return mediaGallery.sort((a, b) => {
				return b.likes - a.likes;
			});
	}
};

/**
 * @async Display photographer data, based on his ID
 *	@constant {Array | Objects} media & photographers
 * @constant params - Get params in URL
 * @constant identifier - Get id in params
 * @constant selectedPhotographerData - return
 * @constant $photographerHeader {HTMLElement} - Get html for place photographer header
 * @constant mediaGallery - Return array of medias, based on photographer identifier
 * @function updateMediaGallery
	* @event listen when user change select state
 */
async function displayPhotographerData() {
	const { media, photographers } = await getData();
	const params = new URLSearchParams(document.location.search.substring(1));
	const identifier = params.get("id");
	const selectedPhotographerData = photographers.find(
		(photographer) => photographer.id == identifier
	);
	const $photographerHeader = document.querySelector(".photographer-page__header-section");
	$photographerHeader.innerHTML += new Photographer(selectedPhotographerData).userHeader;
	const mediaGallery = media.filter((media) => media.photographerId == identifier);

	updateMediaGallery(mediaGallery);

	document.addEventListener("change", function (event) {
		$elementGallery.innerHTML = "";
		const option = filterByOption(mediaGallery, event.target.value);
		updateMediaGallery(option);
	});
}

/**
 * Update media gallery
 * @param {Array} gallery
 */
function updateMediaGallery(gallery) {
	gallery.forEach((media) => {
		let medias = new MediaFactory(media);
		$elementGallery.innerHTML += medias.createHtml();
	});
}

function incrementLikes() {
	console.log("=====");
	console.log("next step");
	console.log("=====");
}

/**
	* Function for initialized page
	*/
const init = async () => {
	await displayPhotographerData();
	Lightbox.init();

	const $likesButtons = document.querySelectorAll(
		".photographer-page__gallery__media__footer__like-section-button"
	);

	$likesButtons.forEach((likeButton) => {
		likeButton.addEventListener("click", incrementLikes);
	});
};

init();
