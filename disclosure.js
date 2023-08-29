const disclosureSelector = "[data-disclosure]";
const disclosureButtonSelector = "[data-disclosure-button]";
const disclosureContentSelector = "[data-disclosure-content]";

/**
 * @param {HTMLElement} subtree
 */
export function start(subtree = document) {
	const elements = subtree.querySelectorAll("[hp-cloak]");
	for (let i = 0; i < elements.length; i++) {
		const element = elements[i];
		if (!element) {
			continue;
		}
		element.removeAttribute("hp-cloak");
	}

	const disclosures = subtree.querySelectorAll(disclosureSelector);
	for (let i = 0; i < disclosures.length; i++) {
		const disclosure = disclosures[i];
		if (!disclosure) {
			continue;
		}

		const button = disclosure.querySelector(disclosureButtonSelector);
		if (!button) {
			continue;
		}

		const content = disclosure.querySelector(disclosureContentSelector);
		if (!content) {
			continue;
		}

		const contentId = content.getAttribute("id") || generateId();

		button.setAttribute("aria-controls", contentId);
		button.setAttribute("role", "button");

		content.setAttribute("id", contentId);

		const initialExpanded =
			content.getAttribute("data-disclosure-content") === "visible";
		button.setAttribute("aria-expanded", initialExpanded.toString());
		if (initialExpanded) {
			content.removeAttribute("hidden");
		} else {
			content.setAttribute("hidden", "");
		}

		button.addEventListener("click", handleClick);
	}
}

/**
 * @param {HTMLElement} subtree
 */
export function stop(subtree = document) {
	const disclosures = subtree.querySelectorAll(disclosureSelector);
	for (let i = 0; i < disclosures.length; i++) {
		const disclosure = disclosures[i];
		if (!disclosure) {
			continue;
		}

		const button = disclosure.querySelector(disclosureButtonSelector);
		if (!button) {
			continue;
		}

		button.removeEventListener("click", handleClick);
	}
}

/**
 * @param {MouseEvent} event
 */
function handleClick(event) {
	const button = event.currentTarget;
	const disclosure = button.closest(disclosureSelector);
	if (!disclosure) {
		return;
	}

	const content = disclosure.querySelector(disclosureContentSelector);
	if (!content) {
		return;
	}

	const expanded = button.getAttribute("aria-expanded") === "true";
	button.setAttribute("aria-expanded", !expanded ? "true" : "false");
	if (!expanded) {
		content.removeAttribute("hidden");
	} else {
		content.setAttribute("hidden", "");
	}
}

let idCounter = 0;
function generateId() {
	return `hp-disclosure-${idCounter++}`;
}
