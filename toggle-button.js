const TOGGLE_BUTTON_SELECTOR = "[data-toggle-button]";

/**
 * Starts the toggle button behavior for the given subtree.
 * @param {HTMLElement} subtree
 */
export function start(subtree = document) {
	const toggleButtons = subtree.querySelectorAll(TOGGLE_BUTTON_SELECTOR);
	for (let i = 0; i < toggleButtons.length; i++) {
		const toggleButton = toggleButtons[i];
		if (!toggleButton) {
			continue;
		}

		toggleButton.setAttribute("role", "button");

		const initialPressed =
			toggleButton.getAttribute("aria-pressed") === "true";
		toggleButton.setAttribute("aria-pressed", initialPressed.toString());

		const initialDisabled = toggleButton.hasAttribute("disabled");
		if (initialDisabled) {
			toggleButton.setAttribute("aria-disabled", "true");
		}

		toggleButton.addEventListener("click", handleClick);

		const observer = new MutationObserver((mutations) => {
			for (let j = 0; j < mutations.length; j++) {
				const mutation = mutations[j];
				if (!mutation) {
					continue;
				}

				const disabled = mutation.target.hasAttribute("disabled");
				if (disabled) {
					mutation.target.setAttribute("aria-disabled", "true");
				} else {
					mutation.target.removeAttribute("aria-disabled");
				}
			}
		});

		observer.observe(toggleButton, {
			attributes: true,
			attributeFilter: ["disabled"],
		});
	}
}

/**
 * Stops the toggle button behavior for the given subtree.
 * @param {HTMLElement} subtree
 */
export function stop(subtree = document) {
	const toggleButtons = subtree.querySelectorAll(TOGGLE_BUTTON_SELECTOR);
	for (let i = 0; i < toggleButtons.length; i++) {
		const toggleButton = toggleButtons[i];
		if (!toggleButton) {
			continue;
		}

		toggleButton.removeEventListener("click", handleClick);
	}
}

/**
 * Handles the click event on a toggle button.
 * @param {MouseEvent} event
 */
function handleClick(event) {
	const pressed = event.target.getAttribute("aria-pressed") === "true";
	event.target.setAttribute("aria-pressed", pressed ? "false" : "true");
}
