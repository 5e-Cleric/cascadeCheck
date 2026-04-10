const test = `
@font-face {
  font-family: "Modesto";
  src: url(https://raw.githack.com/5e-Cleric/fonts-/main/D&D%205e/Modesto/Modesto%20Caps%20Condensed%20Bold.ttf);
}

.page {
    background-image: linear-gradient(
        0deg,
        red 0%,
        blue 2px,
    );
    colora:red !important !important;
    background:red
    font-size:10px
}

.page {
    color: white !important;
}
`;
const res = await fetch("https://cdn.jsdelivr.net/npm/@webref/css@latest/css.json");
const cssData = await res.json();
const properties = cssData.properties.map((p) => p.name);
const atrules = cssData.atrules.map((a) => a.name);

function parseCSS(input) {
	const lines = input.split("\n");

	const blocks = [];
	let selector = null;
	let declarations = [];

	let buffer = "";
	let startOffset = 0;
	let startLine = 0;
	let startCol = 0;

	let offset = 0;
	let parenDepth = 0;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i] + "\n";

		const trimmed = lines[i].trim();

		// selector start
		if (trimmed.endsWith("{")) {
			selector = trimmed.slice(0, -1).trim();
			declarations = [];
			offset += line.length;
			continue;
		}

		// block end
		if (trimmed === "}") {
			if (selector) blocks.push({ selector, declarations });
			selector = null;
			offset += line.length;
			continue;
		}

		if (!selector) {
			offset += line.length;
			continue;
		}

		// start declaration
		if (!buffer && line.includes(":")) {
			buffer = lines[i].trim();

			startOffset = offset + lines[i].indexOf(":") - 0;
			startLine = i + 1;
			startCol = lines[i].indexOf(":") + 1;
		} else if (buffer) {
			buffer += " " + trimmed;
		}

		// track parentheses
		for (const ch of lines[i]) {
			if (ch === "(") parenDepth++;
			if (ch === ")") parenDepth--;
		}

		// end declaration
		if (buffer && parenDepth === 0 && buffer.includes(";")) {
			const match = buffer.match(/^\s*([\w-]+)\s*:\s*(.+?)\s*;$/);

			if (match) {
				const prop = match[1];

				const propStart = lines[i].indexOf(prop);
				const propEnd = propStart + prop.length;

				declarations.push({
					prop,
					value: match[2],
					line: startLine,
					loc: {
						line: startLine,
						column: startCol,
						startOffset,
						endOffset: offset + lines[i].length,
					},
				});
			}

			buffer = "";
		}

		offset += line.length;
	}

	return blocks;
}

function lint(input, settings) {
	let issues = [];

	const blocks = parseCSS(input);
	console.dir(blocks, { depth: null });

	for (const block of blocks) {
		let validProperties = [];
		const selector = block.selector;
		if (selector.startsWith("@")) {
			const atRuleName = selector.slice(1).split(" ")[0];

			if (atrules.includes(atRuleName)) {
				validProperties =
					cssData.atrules.find((a) => a.name === atRuleName)?.descriptors.map((d) => d.name) || [];
			}
		} else {
			validProperties = properties;
		}

		for (const decl of block.declarations) {
			// invalid property check
			if (!decl.prop.startsWith("--") && !validProperties.includes(decl.prop)) {
				issues.push({
					position: decl.loc,
					message: "wrong property",
					severity: "medium",
				});
			}

			// !important check
			if (decl.value.includes("!important")) {
				issues.push({
					position: decl.loc,
					message: "!important can be problematic",
					severity: "low",
				});
			}

			// missing value check
			if (!decl.value || decl.value.trim() === "") {
				issues.push({
					position: decl.loc,
					message: "CSS rule missing value",
					severity: "low",
				});
			}

			// multiple !important
			if ((decl.value.match(/!important/g) || []).length > 1) {
				issues.push({
					position: decl.loc,
					message: "multiple !important detected",
					severity: "low",
				});
			}
		}
	}

	console.log("issues:\n", issues);
	return issues;
}

lint(test);

export default lint;
