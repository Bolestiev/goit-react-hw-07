import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { selectContacts } from "../../redux/contactsSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import s from "./ContactForm.module.css";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    const { phonename, phonenumber } = values;

    if (
      contacts.some(
        (contact) =>
          contact.name === phonename || contact.number === phonenumber
      )
    ) {
      alert("Contact with this name or number already exists.");
      return;
    }

    dispatch(addContact({ name: phonename, number: phonenumber }));
    resetForm();
  };

  const validationSchema = Yup.object().shape({
    phonename: Yup.string().min(3).max(50).required("Required"),
    phonenumber: Yup.string().min(3).max(50).required("Required"),
  });

  return (
    <div className={s.wraper}>
      <Formik
        initialValues={{ phonename: "", phonenumber: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={s.form}>
          <label className={s.label}>
            <span>Name</span>
            <Field className={s.imput} name="phonename" />
            <ErrorMessage
              name="phonename"
              component="span"
              className={s.error}
            />
          </label>
          <label className={s.label}>
            <span>Number</span>
            <Field className={s.imput} name="phonenumber" />
            <ErrorMessage
              name="phonenumber"
              component="span"
              className={s.error}
            />
          </label>
          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
