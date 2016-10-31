const { exec } = require("child_process");

const espeak = {
  say: (text, opts=[]) => 
    new Promise((resolve, reject) => {
      opts.unshift(`${text}`);

      const args = opts.reduce((p, c) => `${p} ${c}`, "");

      const cmdStr = `espeak ${args}`

      exec(cmdStr, (err, stdout, stderr) => {
        if (err) reject(stderr);
        else resolve();
      });
    })
};

[1, 2, 3, 4, 5, 6, 7].forEach(n => {
  espeak[`male${n}`] = (text, opts=[]) => {
    opts.push("-v");
    opts.push(`male${n}`);
    return espeak.say(text, opts);
  }
});

[1, 2, 3, 4, 5].forEach(n => {
  espeak[`female${n}`] = (text, opts=[]) => {
    opts.push("-v");
    opts.push(`female${n}`);
    return espeak.say(text, opts);
  }
});

module.exports = espeak;
