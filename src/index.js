const test = 
`.page {
    color:red !important !important;
    background:red
    font-size:10px
}

.page {
    color: white !important;
}
`;

function lint(input, settings) {
	let issues = [];

	function findImportant(input) {
		const lines = input.split("\n");

		lines.forEach((line, i) => {
			// Detect any !important
			if (/!important/.test(line))
				issues.push({ position: { line: i + 1 }, message: `!important can be problematic`, severity: "low" });

			// Detect multiple !important in the same line
			if (/!important.*!important/.test(line))
				issues.push({
					position: { line: i + 1 },
					message: `don't use !important multiple times!`,
					severity: "low",
				});

			// CSS rules missing a colon (not last line before closing })
			if (/^\s*[\w-]+\s*:[^;}\n]*$/.test(line))
				issues.push({
					position: { line: i + 1 },
					message: `CSS rule missing semicolon`,
					severity: "low",
				});

			// CSS rules missing a value but have colon
			if (/^\s*[\w-]+\s*:\s*(?=;?$)/.test(line))
				issues.push({
					position: { line: i + 1 },
					message: `CSS rule missing value`,
					severity: "low",
				});
		});
	}

	findImportant(input);

	return issues;
}

export default lint;