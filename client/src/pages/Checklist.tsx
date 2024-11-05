import { ChangeEventHandler, MouseEventHandler, useState } from "react";
import '../styles/checklist.css';

const CheckList = () => {
const [tasks, setTasks] = useState("temp");
const [editTitle, setEditTitle] = useState("None");

function handleCheckboxClick(e: React.ChangeEvent<HTMLInputElement>) {
    const checkbox: HTMLInputElement = e.target as HTMLInputElement;

  }

function handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {

    const title = e.currentTarget.name;
    setEditTitle(title);
}

return (
    <div className="page">
        <div className="grid">
            <div className="box-left">
                <h2> Night Routine Checklist </h2>
                <ul>
                    {ListItem("Night Routine 1", "Brush your teeth", handleCheckboxClick, handleButtonClick)}
                    {ListItem("Night Routine 2", "Drink a cup of water", handleCheckboxClick, handleButtonClick)}
                </ul>
            </div>
            <div className="box-right">
                    <h2> {editTitle} </h2>
            </div>
        </div>
    </div>
);
};


function ListItem(title: string, description: string, checkHandler: ChangeEventHandler, buttonHandler: MouseEventHandler) {
    return (
        <div>
            <button onClick={buttonHandler} name={title}>
            <li>
                <input
                    type="checkbox"
                    onChange={checkHandler}
                    // checked={}
                    name={title}
                    />
                    {" " + title + ": "}
                    {description}
            </li>
            </button>
        </div>
    );
  }

export default CheckList;

