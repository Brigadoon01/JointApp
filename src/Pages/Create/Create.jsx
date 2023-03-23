import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCollection } from "../../hooks/useCollection";
import { timestamp } from "../../firebase/Config";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import Select from "react-select";
import "./Create.css";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const { addDocument, response } = useFirestore('projects');
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate()

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [asignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError("Please select a project category");
      return;
    }
    if (asignedUsers.length < 1) {
      setFormError("Please assign at least one user");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = asignedUsers.map((u) => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id,
      };
    });

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };
    await addDocument(project)
    if(!response.error){
      navigate('/')
    }
    };

  return (
    <div className="create-form">
      <h2 className="page-title"> Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project Name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
          <span>Set Due Date:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project Category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assign To:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        <div className="buttom">
          <button className="btn create-btn">Add Project</button>
          {formError && <p className="error create-error">{formError}*</p>}
        </div>
      </form>
    </div>
  );
}
