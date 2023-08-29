import { describe, expect, test } from "vitest";
import { getByRole, getByText } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { start } from "./disclosure.js";

// Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/

describe("disclosure", () => {
	test("sets a role of `button` on the button", () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<div data-disclosure>
				<div data-disclosure-button>Toggle</div>
			    <div data-disclosure-content>Content</div>
			</div>
		`;

		start(container);

		expect(getByRole(container, "button")).toHaveTextContent("Toggle");
	});

	test("sets `aria-expanded` to `false` on the button by default", () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<div data-disclosure>
				<div data-disclosure-button>Toggle</div>
			    <div data-disclosure-content>Content</div>
		    </div>
		`;

		start(container);

		expect(getByRole(container, "button")).toHaveAttribute(
			"aria-expanded",
			"false",
		);
	});

	test("sets `hidden` on the content by default", () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<div data-disclosure>
				<div data-disclosure-button>Toggle</div>
			    <div data-disclosure-content>Content</div>
		    </div>
		`;

		start(container);

		expect(getByText(container, "Content")).toHaveAttribute("hidden");
	});

	test("sets `aria-expanded` to `true` if content is open to begin with", () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<div data-disclosure>
				<div data-disclosure-button>Toggle</div>
			    <div data-disclosure-content="visible">Content</div>
		    </div>
		`;

		start(container);

		expect(getByRole(container, "button")).toHaveAttribute(
			"aria-expanded",
			"true",
		);
	});

	test("removes `hidden` from the content if content is open to begin with", () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<div data-disclosure>
				<div data-disclosure-button>Toggle</div>
			    <div data-disclosure-content="visible">Content</div>
		    </div>
		`;

		start(container);

		expect(getByText(container, "Content")).not.toHaveAttribute("hidden");
	});

	test("sets `aria-controls` on the button", () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<div data-disclosure>
				<div data-disclosure-button>Toggle</div>
			    <div data-disclosure-content>Content</div>
		    </div>
		`;

		start(container);

		expect(getByRole(container, "button")).toHaveAttribute(
			"aria-controls",
			getByText(container, "Content").id,
		);
	});

	test("toggles `aria-expanded` on the button when clicked", async () => {
		const user = userEvent.setup()
		const container = document.createElement("div");
		container.innerHTML = `
			<div data-disclosure>
				<div data-disclosure-button>Toggle</div>
			    <div data-disclosure-content>Content</div>
		    </div>
		`;

		start(container);

		const button = getByRole(container, "button");
		await user.click(button);
		expect(button).toHaveAttribute("aria-expanded", "true");
		await user.click(button);
		expect(button).toHaveAttribute("aria-expanded", "false");
	});

	test("toggles `hidden` on the content when clicked", async () => {
		const user = userEvent.setup()
		const container = document.createElement("div");
		container.innerHTML = `
			<div data-disclosure>
				<div data-disclosure-button>Toggle</div>
			    <div data-disclosure-content>Content</div>
		    </div>
		`;

		start(container);

		const button = getByRole(container, "button");
		await user.click(button);
		expect(getByText(container, "Content")).not.toHaveAttribute("hidden");
		await user.click(button);
		expect(getByText(container, "Content")).toHaveAttribute("hidden");
	});

	test("toggles `aria-expanded` on the button when the space key is pressed", async () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<div data-disclosure>
				<div data-disclosure-button>Toggle</div>
			    <div data-disclosure-content>Content</div>
		    </div>
		`;

		start(container);

		const button = getByRole(container, "button");
		await userEvent.type(button, "{space}");
		expect(button).toHaveAttribute("aria-expanded", "true");
		await userEvent.type(button, "{space}");
		expect(button).toHaveAttribute("aria-expanded", "false");
	});

	test("toggles `hidden` on the content when the space key is pressed", async () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<div data-disclosure>
				<div data-disclosure-button>Toggle</div>
			    <div data-disclosure-content>Content</div>
		    </div>
		`;

		start(container);

		const button = getByRole(container, "button");
		await userEvent.type(button, "{space}");
		expect(getByText(container, "Content")).not.toHaveAttribute("hidden");
		await userEvent.type(button, "{space}");
		expect(getByText(container, "Content")).toHaveAttribute("hidden");
	});

	test("toggles `aria-expanded` on the button when the enter key is pressed", async () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<div data-disclosure>
				<div data-disclosure-button>Toggle</div>
			    <div data-disclosure-content>Content</div>
		    </div>
		`;

		start(container);

		const button = getByRole(container, "button");
		await userEvent.type(button, "{enter}");
		expect(button).toHaveAttribute("aria-expanded", "true");
		await userEvent.type(button, "{enter}");
		expect(button).toHaveAttribute("aria-expanded", "false");
	});

	test("toggles `hidden` on the content when the enter key is pressed", async () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<div data-disclosure>
				<div data-disclosure-button>Toggle</div>
			    <div data-disclosure-content>Content</div>
		    </div>
		`;

		start(container);

		const button = getByRole(container, "button");
		await userEvent.type(button, "{enter}");
		expect(getByText(container, "Content")).not.toHaveAttribute("hidden");
		await userEvent.type(button, "{enter}");
		expect(getByText(container, "Content")).toHaveAttribute("hidden");
	});
});
