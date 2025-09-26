// Test the individual import that causes the warning
try {
  const SkiaChart = require('./skiaChart');
  console.log('skiaChart import successful:', SkiaChart.default ? 'has default' : 'no default');

  const SvgChart = require('./svgChart');
  console.log('svgChart import successful:', SvgChart.default ? 'has default' : 'no default');
} catch (error) {
  console.error('Import failed:', error.message);
}