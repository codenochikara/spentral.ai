export default function Spinner({ size = 16 } = {}) {
  const spinner = document.createElement('span');
  spinner.className = 'spinner';
  spinner.style.width = `${size}px`;
  spinner.style.height = `${size}px`;
  return spinner;
}
