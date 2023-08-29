import "htmx.org";
import * as Disclosure from "./disclosure.js";
import * as ToggleButton from "./toggle-button.js";

document.addEventListener("htmx:load", (event) => {
	Disclosure.stop(event.detail.elt);
	Disclosure.start(event.detail.elt);
	ToggleButton.stop(event.detail.elt);
	ToggleButton.start(event.detail.elt);
});
