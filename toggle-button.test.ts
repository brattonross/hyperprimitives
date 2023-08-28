import { describe, expect, test } from "vitest";
import { getByRole } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { start } from "./toggle-button";

// Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/

describe("toggle button", () => {
	test("sets a role of `button`", () => {
		const container = document.createElement("div");
		container.innerHTML = `<button data-toggle-button>Toggle</button>`;

		start(container);

		expect(getByRole(container, "button")).toHaveTextContent("Toggle");
	});

	test("has a default `aria-pressed` value of `false`", () => {
		const container = document.createElement("div");
		container.innerHTML = `<button data-toggle-button>Toggle</button>`;

		start(container);

		expect(getByRole(container, "button")).toHaveAttribute(
			"aria-pressed",
			"false",
		);
	});

	test("toggles `aria-pressed` value when clicked", async () => {
		const user = userEvent.setup();
		const container = document.createElement("div");
		container.innerHTML = `<button data-toggle-button>Toggle</button>`;

		start(container);
		await user.click(getByRole(container, "button"));

		expect(getByRole(container, "button")).toHaveAttribute(
			"aria-pressed",
			"true",
		);

		await user.click(getByRole(container, "button"));

		expect(getByRole(container, "button")).toHaveAttribute(
			"aria-pressed",
			"false",
		);
	});

	test("toggles `aria-pressed` value when space key is pressed", async () => {
		const user = userEvent.setup();
		const container = document.createElement("div");
		container.innerHTML = `<button data-toggle-button>Toggle</button>`;

		start(container);
		await user.type(getByRole(container, "button"), "{space}");

		expect(getByRole(container, "button")).toHaveAttribute(
			"aria-pressed",
			"true",
		);

		await user.type(getByRole(container, "button"), "{space}");

		expect(getByRole(container, "button")).toHaveAttribute(
			"aria-pressed",
			"false",
		);
	});

	test("toggles `aria-pressed` value when enter key is pressed", async () => {
		const user = userEvent.setup();
		const container = document.createElement("div");
		container.innerHTML = `<button data-toggle-button>Toggle</button>`;

		start(container);
		await user.type(getByRole(container, "button"), "{enter}");

		expect(getByRole(container, "button")).toHaveAttribute(
			"aria-pressed",
			"true",
		);

		await user.type(getByRole(container, "button"), "{enter}");

		expect(getByRole(container, "button")).toHaveAttribute(
			"aria-pressed",
			"false",
		);
	});

	test("does not have `aria-disabled` attribute by default", () => {
		const container = document.createElement("div");
		container.innerHTML = `<button data-toggle-button>Toggle</button>`;

		start(container);

		expect(getByRole(container, "button")).not.toHaveAttribute(
			"aria-disabled",
		);
	});

	test("sets `aria-disabled` attribute when `disabled`", () => {
		const container = document.createElement("div");
		container.innerHTML = `<button data-toggle-button disabled>Toggle</button>`;

		start(container);

		expect(getByRole(container, "button")).toHaveAttribute(
			"aria-disabled",
			"true",
		);
	});

	test("sets `aria-disabled` attribute when `disabled` is mutated", () => {
		const container = document.createElement("div");
		container.innerHTML = `<button data-toggle-button>Toggle</button>`;

		start(container);

		const button = getByRole(container, "button");
		button.setAttribute("disabled", "");

		expect(button).toHaveAttribute("aria-disabled", "true");

		button.removeAttribute("disabled");

		expect(button).not.toHaveAttribute("aria-disabled");
	});
});
