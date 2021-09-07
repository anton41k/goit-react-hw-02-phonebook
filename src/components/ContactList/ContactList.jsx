import React from "react";
import css from "./ContactList.module.css";

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.contact_list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={css.contact_item}>
          <span className={css.contact_name}>{name}</span>
          <span className={css.contact_number}>{number}</span>
          <button
            className={css.del_btn}
            type="button"
            onClick={() => onDeleteContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
