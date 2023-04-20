const fs = require('fs');

const sourceTxt = fs.readFileSync('source.txt', 'utf-8');

const tops = sourceTxt
  .replaceAll('\n', '')
  .replaceAll('   ', ' ')
  .split('||||');
const sections = tops.map((top, i) => {
  const inners = top.split('++++');
  if (i === 4) {
    //console.log(inners);
  }

  const output = {
    num: i + 1,
    title: inners[0].trim(),
    inners: inners.slice(1).map((inner) => {
      const values = inner.split('--');
      const meta = values[0].split('%%%%');
      const options = values.slice(1);

      return {
        title: meta[0].trim(),
        description: meta[1].trim(),
        options: options.map((option) => {
          // console.log(meta[0]);
          console.log(options);
          console.log('1', option);
          console.log('2', option.split('$$$$')[0], option.split('$$$$')[1]);
          const optionMeta = option.split('$$$$');
          //    console.log(optionMeta);

          return {
            title: optionMeta[0].trim(),
            description: optionMeta[1].trim(),
          };
        }),
      };
    }),
  };

  return output;
});

sections.forEach((section, i) => {
  const output = [`title: '${section.title}'`];

  output.push(
    `inners: [${section.inners.map((inner) => {
      return `'${JSON.stringify(inner)}'`;
    })}]`
  );

  fs.writeFileSync(`../../site/_data/scoring_${i}.yml`, output.join('\n'));
});

//fs.writeFileSync('../../site/_data/sections.yml', output.join('\n'));
