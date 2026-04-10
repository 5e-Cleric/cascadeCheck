const test = `
@font-face {
  font-family: "Modesto";
  src: url(https://raw.githack.com/5e-Cleric/fonts-/main/D&D%205e/Modesto/Modesto%20Caps%20Condensed%20Bold.ttf);
}

.page {
  &:has(.frontCover) :is(h1, h2) {
    font-family: "Modesto";
  }

  hr {
    display: block;
    column-span: all;
  }

  h1,
  h2,
  h3,
  h4 {
    position: relative;
    font-weight: 200;
  }

  :is(.e, .ho, .re, .of) {
    &:after {
      positione: absolute;
      top: var(--top, 0);
      right: var(--offset, 0);
      display: block;
      content: var(--origin);
      width: fit-content;
      font-size: 10pt;
      font-family: BookInsanityRemake;
      font-weight: 100;
      letter-spacing: 0px;
      color: #2f2f2f;
      background: #ede7df;
      border: 1px solid #d7c598;
      padding-inline: 5px;
      border-radius: 10px;
      font-style: italic;
      box-shadow: 1px 2px 5px;
    }

    &.common:after {
      background: #bae1ff;
      border-color: blue;
      content: var(--origin) ", common";
    }
    &.uncommon:after {
      background: #baffc9;
      border-color: green;
      content: var(--origin) ", uncommon";
    }
    &.rare:after {
      background: #ffffba;
      border-color: #bf9000;
      content: var(--origin) ", rare";
    }
    &.veryRare:after {
      background: #ffdfba;
      border-color: #b45f06;
      content: var(--origin) ", very rare";
    }
    &.legendary:after {
      background: #ffb3ba;
      border-color: red;
      content: var(--origin) ", legendary";
    }
    &.artifact:after {
      background: #c3a4df;
      border-color: purple;
      content: var(--origin) ", artifact";
    }
    &.varies:after {
      background: linear-gradient(
        90deg,
        #ffabab 0%,
        #ffefa8 18%,
        #c2ffa6 34%,
        #9effed 52%,
        #b0b9ff 69%,
        #f3a9fc 85%,
        #ffadad 100%
      );

      border-color: purple;
      content: var(--origin) ", varies";
    }

    &.inline:after {
      position: static;
      display: inline
      box-shadow: 1px 2px 2px #00000077;
    }
  }

  .e::after {
    content: "00a000a0" !important;
  }
  .ho {
    --origin: "DM ✓";
  }
  .re {
    --origin: "reworked";
  }
  .of {
    --origin: "official";
  }

  .list {
    ul,
    ul li {
      line-height: inherit;
      list-style-type: "--  ";
    }
  }
}

@media print {
  .page:has(.hidden) {
    display: none;
  }
}

/*
##################################################################################

                              TIMELINE CSS

##################################################################################
*/

.page .timeline {
  --resolution: 1px;
  --w: calc((var(--end) - var(--start, 0)) * var(--resolution));
  --text: "hello";
  counter-reset: start var(--start, 0) end var(--end);

  display: block;
  position: relative;
  width: var(--w, 500px);
  height: 10px;
  background-image: linear-gradient(
    0deg,
    var(--borderColor, #c0ad6a) 0%,
    var(--borderColor, #c0ad6a) 2px,
    var(--lineColor, white) 3px,
    var(--lineColor, white) 7px,
    var(--borderColor, #c0ad6a) 7px,
    var(--borderColor, #c0ad6a) 100%
  );
  background-size: 100% 100%;
  margin-block: 50px;
  margin-left: 40px;

  &.wide {
    margin-inline: auto;
  }

  &:before,
  &:after {
    display: block;
    position: absolute;
    top: 50%;
    width: max-content;
    height: 1em;
    padding: 0.3em;
    background: var(--lineColor, white);
    border: 3px solid var(--borderColor, #c0ad6a);
    border-radius: 100px;
    font-weight: 900;
    z-index: -1;
  }

  &:before {
    right: 100%;
    translate: 3px -50%;
    content: var(--unit, " DC") "ón " counter(start);
  }

  &:after {
    right: 0;
    translate: calc(100% - 3px) -50%;
    content: var(--unit, " DC") "ón " counter(end);
  }

  &.onlyStart:after {
    display: none;
  }

  &.onlyEnd:before {
    display: none;
  }

  & p:has(.event) {
    line-height: unset;
  }

  .event {
    container-type: normal;

    margin: 0;
    position: absolute;
    width: max-content;
    height: max-content;
    word-break: break-word;
    top: 2em;
    left: calc((var(--date) - var(--start, 0)) * var(--resolution));
    translate: -50%;
    text-align: center;
    z-index: -1;

    &:before {
      counter-reset: date var(--date);
      display: block;
      position: absolute;
      top: -3.5em;
      left: 50%;
      translate: -50%;
      width: max-content;
      height: 1em;
      font-weight: 900;
      color: #58180d;
      content: var(--unit, " DC") "ón " counter(date);
    }

    &:after {
      display: block;
      position: absolute;
      top: -2.35em;
      left: 50%;
      translate: -50%;
      width: 15px;
      height: 25px;
      background: #c0ad6a;
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 10%,
        60% 20%,
        100% 50%,
        50% 100%,
        0% 50%,
        40% 20%,
        0% 10%
      );
      content: "";
      z-index: -2;
    }

    &.reverse {
      top: unset;
      bottom: 2em;

      &:before {
        top: unset;
        bottom: -3.6em;
      }

      &:after {
        top: unset;
        bottom: -2.35em;
        scale: 1 -1;
      }
    }

    & p + p {
      text-indent: 0;
    }
  }

  .range {
    height: 6px;
    width: calc((var(--dateEnd) - var(--dateStart)) * var(--resolution));
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    left: calc((var(--dateStart) - var(--start, 0)) * var(--resolution));

    &.round {
      border-radius: 100px;
    }
  }

  .point {
    height: 6px;
    width: 6px;
    position: absolute;
    top: 50%;
    translate: 0 -50%;
    left: calc((var(--date) - var(--start, 0)) * var(--resolution));

    &.round {
      border-radius: 100px;
    }
  }

  + .timeline {
    margin-top: 130px;
  }
}

.page h5 {
  &:has(+ .timeline) {
    margin-top: 60px;
    text-align: center;
  }

  &:has(+ .timeline.wide) {
    column-span: all;
    text-align: center;
  }

  + .timeline {
    margin-top: 60px;
  }
}

.page .columnSplit + h5 {
  margin-top: 0;
}

.page .legend {
  padding: 0 0.2cm 0.2cm;
  background-image: url("/assets/parchmentBackground.jpg");
  margin-block: 10px;
  border: 4px solid;
  border-image: radial-gradient(
    circle,
    #c0ad6a 0%,
    #bda656 11%,
    #dcc677 28%,
    #e0ca7c 36%,
    #d9c374 63%,
    #bda656 77%
  );
  border-image-slice: 10;
  box-shadow: 2px 2px 8px black;

  .ref {
    width: 40px;
    height: 1em;
    box-shadow: 0 0 2px 1px black;
    position: relative;
    top: 2px;
    margin-right: 5px;
  }
}

/*
##################################################################################

                              VERTICAL TIMELINE CSS

##################################################################################
*/

.page .timeline.vertical {
  --resolution: 1px;
  --w: calc((var(--end) - var(--start, 0)) * var(--resolution));
  --text: "hello";
  counter-reset: start var(--start, 0) end var(--end);

  display: block;
  position: relative;
  width: 10px;
  height: var(--w, 500px);
  background-image: linear-gradient(
    90deg,
    var(--borderColor, #c0ad6a) 0%,
    var(--borderColor, #c0ad6a) 2px,
    var(--lineColor, white) 3px,
    var(--lineColor, white) 7px,
    var(--borderColor, #c0ad6a) 7px,
    var(--borderColor, #c0ad6a) 100%
  );
  background-size: 100% 100%;
  margin-block: 50px;
  margin-left: 150px;

  &.wide {
    margin-inline: auto;
  }

  &:before,
  &:after {
    display: block;
    position: absolute;
    left: 50%;
    width: max-content;
    height: 1em;
    padding: 0.3em;
    background: var(--lineColor, white);
    border: 3px solid var(--borderColor, #c0ad6a);
    border-radius: 100px;
    font-weight: 900;
    z-index: -1;
  }

  &:before {
    top: 0;
    translate: -50% calc(-100% + 2.5px);
    content: counter(start) var(--unit, " DC");
  }

  &:after {
    top: unset;
    bottom: 0;
    translate: -50% calc(100% - 3.3px);
    content: counter(end) var(--unit, " DC");
  }

  &.onlyStart:after {
    display: none;
  }

  &.onlyEnd:before {
    display: none;
  }

  & p:has(.event) {
    line-height: unset;
  }

  .event {
    margin: 0;
    position: absolute;
    width: max-content;
    height: max-content;
    word-break: break-word;
    top: calc((var(--date) - var(--start, 0)) * var(--resolution));
    left: 30px;
    translate: 0 -0.5em;
    text-align: left;
    z-index: -1;
    font-weight: 100;

    &:before {
      counter-reset: date var(--date);
      display: block;
      position: absolute;
      top: 2px;
      left: -85px;
      translate: 0 0;
      width: max-content;
      height: 1em;
      font-weight: 900;
      color: #58180d;
      content: counter(date) var(--unit, " DC");
    }

    &:after {
      display: block;
      position: absolute;
      top: -5px;
      left: -29px;
      translate: 0 0;
      width: 15px;
      height: 25px;
      background: #c0ad6a;
      clip-path: polygon(
        0% 0%,
        100% 0%,
        100% 10%,
        60% 20%,
        100% 50%,
        50% 100%,
        0% 50%,
        40% 20%,
        0% 10%
      );
      content: "";
      z-index: -2;
      rotate: -90deg;
    }

    &.reverse {
      top: calc((var(--date) - var(--start, 0)) * var(--resolution));
      left: unset;
      right: 30px;
      text-align: right;
      bottom: unset;

      &:before {
        top: 2px;
        left: unset;
        right: -85px;
      }

      &:after {
        top: -5px;
        left: unset;
        right: -29px;
        scale: 1 -1;
      }
    }

    & p + p {
      text-indent: 0;
    }
  }

  .range {
    height: calc((var(--dateEnd) - var(--dateStart)) * var(--resolution));
    width: 6px;
    position: absolute;
    top: calc((var(--dateStart) - var(--start, 0)) * var(--resolution));
    left: 50%;
    translate: -50% 0;

    &.round {
      border-radius: 100px;
    }
  }

  .point {
    height: 6px;
    width: 6px;
    position: absolute;
    top: calc((var(--date) - var(--start, 0)) * var(--resolution));
    translate: -50%;
    left: 50%;

    &.round {
      border-radius: 100px;
    }
  }

  + .timeline {
    margin-top: 130px;
  }
}

:root {
  --scroll: url("/assets/parchmentBackground.jpg");
  --baverage: #f2ece4;
  --h1color: #58180d;
  --tdcolor: #e0e5c1;
  --titlecolor: #ed1c24;
  --underlinecolor: #f0bf48;
  --statblocklines: #9c2b1b;
  --redscroll: url(https://i.imgur.com/YvYGqOX.jpg);
  --bluescroll: url(https://i.imgur.com/w2m4BgW.jpg);
  --seascroll: url(https://i.imgur.com/dKciX3y.jpg);
}

.tab-layout {
  &:after {
    all: unset;
  }

  .tabs {
    position: relative;
    width: 350px;
    height: 350px;

    & input {
      --position: calc((var(--number)) - 80px);
      counter-reset: number var(--number);
      width: fit-content;
      height: 50px;
      appearance: unset;
      display: block;
      background: var(--scroll);
      position: absolute;
      left: var(--position);
      top: 0;
      translate: calc(100% * (var(--number) - 1)) -100%;
      z-index: 25;
      border-bottom: 3px solid var(--h1color);
      box-shadow: 1px 4px 10px #000;
      clip-path: polygon(-100% 100%, 200% 100%, 200% -100%, -100% -100%);
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;

      &:after {
        content: attr(id);
        height: 100%;
        padding-inline: 10px;
        text-align: center;
        display: grid;
        place-items: center;
        font-family: MrEavesRemake;
        font-size: 20px;
        color: var(--h1color);
      }

      &:checked {
        background: var(--redscroll);
        background-size: 150%;

        &:after {
          color: #ff6;
        }
      }

      &:nth-of-type(1):checked ~ .tab:nth-of-type(1) {
        z-index: 20;
      }
      &:nth-of-type(2):checked ~ .tab:nth-of-type(2) {
        z-index: 20;
      }
      &:nth-of-type(3):checked ~ .tab:nth-of-type(3) {
        z-index: 20;
      }
      &:nth-of-type(4):checked ~ .tab:nth-of-type(4) {
        z-index: 20;
      }
    }

    .tab {
      height: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      background-image: url("/assets/parchmentBackground.jpg");
      padding: 20px;
      columns: 2;
      z-index: 10;
      border-top: 3px solid var(--h1color);
      box-shadow: 1px 4px 10px #000;
    }
  }
}
`;

const res = await fetch("https://cdn.jsdelivr.net/npm/@webref/css@latest/css.json");
const cssData = await res.json();

const properties = cssData.properties.map((p) => p.name);

function parseCSS(input) {
	const lines = input.split("\n");

	const blocks = [];
	const stack = [];

	let buffer = "";
	let startOffset = 0;
	let startLine = 0;
	let startCol = 0;

	let offset = 0;
	let parenDepth = 0;

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i] + "\n";
		const trimmed = lines[i].trim();

		// block start
		if (trimmed.endsWith("{")) {
			const raw = trimmed.slice(0, -1).trim();

			let block;

			if (raw.startsWith("@")) {
				block = {
					type: "atrule",
					name: raw.slice(1).split(" ")[0],
					raw,
					declarations: [],
					children: [],
				};
			} else {
				block = {
					type: "rule",
					name: raw,
					declarations: [],
					children: [],
				};
			}

			if (stack.length) {
				stack[stack.length - 1].children.push(block);
			} else {
				blocks.push(block);
			}

			stack.push(block);
			offset += line.length;
			continue;
		}

		// block end
		if (trimmed === "}") {
			stack.pop();
			offset += line.length;
			continue;
		}

		if (!stack.length) {
			offset += line.length;
			continue;
		}

		const current = stack[stack.length - 1];

		// start declaration
		if (!buffer && line.includes(":")) {
			buffer = lines[i].trim();

			startOffset = offset + lines[i].indexOf(":");
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
				current.declarations.push({
					prop: match[1],
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

function getValidProperties(block) {
	if (block.type === "atrule") {
		const def = cssData.atrules.find((a) => a.name === block.name);

		// container at-rules like @media
		if (!def || !def.descriptors) return null;

		return def.descriptors.map((d) => d.name);
	}

	return properties;
}

function lintBlocks(blocks, issues) {
	for (const block of blocks) {
		const validProperties = getValidProperties(block);

		for (const decl of block.declarations) {
			// invalid property check (ignore custom props)
			if (validProperties && !decl.prop.startsWith("--") && !validProperties.includes(decl.prop)) {
				issues.push({
					position: decl.loc,
					message: `unknown property: '${decl.prop}'`,
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
					message: "missing value",
					severity: "low",
				});
			}
		}

		if (block.children.length) {
			lintBlocks(block.children, issues);
		}
	}
}

function lint(input) {
	let issues = [];

	const blocks = parseCSS(input);
	//console.dir(blocks, { depth: 1 });

	lintBlocks(blocks, issues);

	return issues;
}

export default lint;
