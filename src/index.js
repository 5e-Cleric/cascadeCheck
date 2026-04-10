const test = `.page {
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
const properties = cssData.properties.map(p => p.name);
//console.log(properties);

function lint(input, settings) {
	let issues = [];

	const lines = input.split("\n");

	lines.forEach((line, i) => {
		const match = line.match(/^\s*([\w-]+)\s*:/d);
		if (!match) return; // not a property line
		const prop = match[1];
		if (!properties.includes(prop)) {
			issues.push({ position: { line: i + 1 , from: match.indices[1][0], to: match.indices[1][1]}, message: `wrong property`, severity: "medium" });
		}
	});

	lines.forEach((line, i) => {
		// Detect any !important
		if (/!important/.test(line))
			issues.push({ position: { line: i + 1 }, message: `!important can be problematic`, severity: "low" });

		// Detect multiple !important in the same line
		/*
			if (/!important.*!important/.test(line))
				issues.push({
					position: { line: i + 1 },
					message: `don't use !important multiple times!`,
					severity: "low",
				});
			*/
		// CSS rules missing a colon (not last line before closing })
		if (/^\s*[\w-]+\s*:[^;}\n]*$/.test(line))
			issues.push({
				position: { line: i + 1 },
				message: `CSS rule missing semicolon`,
				severity: "high",
			});

		// CSS rules missing a value but have colon
		if (/^\s*[\w-]+\s*:\s*(?=;?$)/.test(line))
			issues.push({
				position: { line: i + 1 },
				message: `CSS rule missing value`,
				severity: "low",
			});
	});

	return issues;
};

export default lint;
