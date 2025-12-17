import Spinner from './Spinner';

export default function Button(
  label,
  {
    type = 'primary',
    htmlType = 'button',
    onClick,
    loading = false,
    disabled = false
  } = {}
) {
  const btn = document.createElement('button');
  btn.className = `btn btn-${type}`;
  btn.type = htmlType;

  const textSpan = document.createElement('span');
  textSpan.className = 'btn-text';
  textSpan.textContent = label;

  const spinner = Spinner({ size: 16 });
  spinner.classList.add('hidden');

  btn.append(textSpan, spinner);

  if (onClick) btn.onclick = onClick;

  btn.setLoading = (isLoading) => {
    if (isLoading) {
      btn.classList.add('btn-loading');
      btn.disabled = true;
      spinner.classList.remove('hidden');
    } else {
      btn.classList.remove('btn-loading');
      btn.disabled = disabled;
      spinner.classList.add('hidden');
    }
  };

  if (loading) btn.setLoading(true);
  if (disabled) btn.disabled = true;

  return btn;
}
