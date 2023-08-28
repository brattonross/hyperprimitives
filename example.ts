import "htmx.org";
import * as ToggleButton from "./toggle-button.js";

document.addEventListener("htmx:load", (event) => {
	ToggleButton.stop(event.detail.elt);
	ToggleButton.start(event.detail.elt);
});
