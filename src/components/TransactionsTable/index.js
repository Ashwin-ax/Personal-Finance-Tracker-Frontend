import React from "react";
import "./index.css";

// We add 'showActions' prop which defaults to true
const TransactionTable = ({
  transactions,
  onEdit,
  onDelete,
  showActions = true,
}) => {
  return (
    <div className="table-wrapper animate-fade-in">
      <div className="table-header">
        <div className="col-sr">SR.</div>
        <div className="col-title">TITLE</div>
        <div className="col-amount">AMOUNT</div>
        <div className="col-cat">CATEGORY</div>
        <div className="col-date">DATE</div>
        <div className="col-notes">NOTES</div>
        {/* Only show Header if actions are enabled */}
        {showActions && <div className="col-actions">ACTIONS</div>}
      </div>

      <div className="table-body">
        {transactions.map((t, index) => (
          <div className="table-row" key={t._id}>
            <div className="col-sr">{index + 1}</div>
            <div className="col-title text-bold">{t.title}</div>
            <div className="col-amount text-primary">₹ {t.amount}</div>
            <div className="col-cat">
              <span className="badge">{t.category}</span>
            </div>
            <div className="col-date">
              {t.date ? t.date.split("T")[0] : "N/A"}
            </div>
            <div className="col-notes text-muted">{t.notes}</div>

            {/* Only render the buttons if showActions is true */}
            {showActions && (
              <div className="col-actions">
                <button className="edit-action" onClick={() => onEdit(t)}>
                  Edit
                </button>
                <button
                  className="delete-action"
                  onClick={() => onDelete(t._id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionTable;
