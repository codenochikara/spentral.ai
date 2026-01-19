import { createIncome, updateIncome } from '../../api/incomes.api';
import '../../styles/incomes.css';

export default function IncomeModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay hidden';

  let editingId = null;

  overlay.innerHTML = `
    <div class="modal card">
      <h3 id="modal-title">Add Income</h3>

      <form class="modal-form">
        <input name="amount" type="number" placeholder="Amount" required />
        <input name="source" placeholder="Source" required />
        <input name="description" placeholder="Description" />
        <textarea name="notes" placeholder="Notes"></textarea>

        <div class="modal-actions">
          <button type="button" class="btn btn-secondary cancel">Cancel</button>
          <button type="submit" class="btn btn-primary save">Save</button>
        </div>
      </form>
    </div>
  `;

  const form = overlay.querySelector('form');

  overlay.open = (income = null) => {
    overlay.classList.remove('hidden');
    form.reset();

    if (income) {
      editingId = income.id;
      overlay.querySelector('#modal-title').textContent = 'Edit Income';

      form.amount.value = income.amount;
      form.source.value = income.source;
      form.description.value = income.description;
      form.notes.value = income.notes;
    } else {
      editingId = null;
      overlay.querySelector('#modal-title').textContent = 'Add Income';
    }
  };

  overlay.close = () => {
    overlay.classList.add('hidden');
  };

  overlay.querySelector('.cancel').onclick = overlay.close;

  form.onsubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form));

    try {
      if (editingId) {
        await updateIncome(editingId, data);
      } else {
        await createIncome(data);
      }

      window.location.reload(); // simple & safe for now
    } catch (err) {
      console.error(err);
    }
  };

  return overlay;
}
