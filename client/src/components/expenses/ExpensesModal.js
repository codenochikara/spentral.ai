import { createExpense, updateExpense } from '../../api/expenses.api';
import '../../styles/components.css';
import '../../styles/expenses.css';

export default function ExpensesModal() {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay hidden';

  let editingId = null;

  overlay.innerHTML = `
    <div class="modal card">
      <h3 id="modal-title">Add Expense</h3>

      <form class="modal-form">
        <input name="amount" type="number" placeholder="Amount" required />
        <input name="category" placeholder="Category" required />
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

  overlay.open = (expense = null) => {
    overlay.classList.remove('hidden');
    form.reset();

    if (expense) {
      editingId = expense.id;
      overlay.querySelector('#modal-title').textContent = 'Edit Expense';

      form.amount.value = expense.amount;
      form.category.value = expense.category;
      form.description.value = expense.description;
      form.notes.value = expense.notes;
    } else {
      editingId = null;
      overlay.querySelector('#modal-title').textContent = 'Add Expense';
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
      let saved;

      if (editingId) {
        const res = await updateExpense(editingId, data);
        saved = res.data.data;
      } else {
        const res = await createExpense(data);
        saved = res.data.data;
      }

      overlay.close();
      overlay.onSave?.(saved, Boolean(editingId));
    } catch (err) {
      console.error('Failed to save expense', err);
    }
  };

  return overlay;
}
