import React, { useState } from 'react'


export default function NewTodo() {
    const [inputText, setText] = useState('');
    const [inputCategory, setInputCategory] = useState('Personal')
    const [createTask, setTask] = useState([]);
    const [editTask, setEditTask] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [completedTask, setCompletedTask] = useState('');

    const formSubmitHandler = (event) => {
        event.preventDefault();
        const newTask = {
            id: Math.floor(Math.random() * 10000) + 1,
            text: inputText,
            completed: false,
            category: inputCategory,

        };
        if (inputText.length != 0) {
            setTask([...createTask, newTask]);

            setText('');
        }

    }
    const inputHandler = (event) => {
        setText(event.target.value);

    }
    const categoryHandler = (event) => {
        setInputCategory(event.target.value);
    }

    const addTaskHandler = () => {

    }
    const keypressHandler = (event) => {
        if (event.key === 'Enter') {
            addTaskHandler();
        }
    }

    const dellTaskHandler = (id) => {
        let remainingTask;
        if (window.confirm('Delete This Item ?')) {
            remainingTask = createTask.filter((element) => {
                return element.id !== id
            })
        } else {
            return createTask;
        }

        setTask(remainingTask);
    }

    const taskComplitionHandler = (id) => {
        // console.log(id);
        const elemId = createTask.map((element) => {
            if (element.id === id) {                
                element.completed = !element.completed;
            }
            return element;
        })        
        setTask(elemId);
    }

    const editTaskHandler = (id) => {
        setEditTask(id);
        const taskToEdit = createTask.find((element) => element.id === id)
        setEditingText(taskToEdit.text);
    }

    const editInputHandler = (event) => {
        setEditingText(event.target.value);
    }

    const submitTaskHandler = (id) => {
        const updatedTask = createTask.map((element) => {
            if (element.id === id) {
                element.text = editingText
            }
            return element;
        })

        setTask(updatedTask);
        setEditTask("")
    }
    const submitKeypressHandler = (id, event) => {
        if (event.key === 'Enter') {
            submitTaskHandler(id);
        }
    }

    return (
        <div className="todoBox">
            <h2 className="todo--title">Todo App</h2>
            <div className="inputDiv">
                <form onSubmit={formSubmitHandler}>
                    <label className="inputLabel" htmlFor="inputField">New Todo</label>
                    <input className="inputDiv__filed" type="text"
                        value={inputText} id="inputField"
                        placeholder='Enter task to do'
                        onChange={inputHandler}
                        onKeyPress={keypressHandler}
                    />
                    <select className='category' value={inputCategory} onChange={categoryHandler}>
                        <option value="Professional">Professional</option>
                        <option value="Personal">Personal</option>
                    </select>
                    <button className="addBtn" onClick={addTaskHandler}><span className="addbtn_span">&#43;</span></button>
                </form>
            </div>
            <div className="taskList">
                <ul className="taskList__ul">
                    {createTask.map((element) => {
                        return (
                            <div key={element.id} >
                                {editTask === element.id ? (
                                    <div className="inputDiv">
                                        <input className="inputDiv__filed"
                                            type="text"
                                            onChange={editInputHandler}
                                            value={editingText}
                                            onKeyPress={(event) => submitKeypressHandler(element.id, event)}
                                        />
                                        <button className="addBtn submitBtn" onClick={(event) => submitTaskHandler(element.id, event)}><i className="fas fa-check" ></i></button>
                                    </div>
                                ) : (
                                    <div className={(element.category == 'Professional') ? 'Professional-cat' : 'Personal-cat'}>
                                        <li className={element.completed ? "Active--task" : "taskList__li"} checked={element.completed}>
                                            <button className='taskDonebtn' onClick={() => taskComplitionHandler(element.id)}>
                                                <i className="fas fa-check-circle"></i>
                                            </button><span>{element.text}</span>
                                            <button className="editBtn" onClick={() => editTaskHandler(element.id)}><i className="fas fa-edit" ></i></button>
                                            <button className="dellBtn" onClick={() => dellTaskHandler(element.id)}><i className="fa fa-trash"></i></button>
                                        </li>
                                    </div>
                                )}

                            </div>
                        )
                    })}
                </ul>
            </div>
            {/* <p className="remainingtask">There {completedTask.length} is pending task</p> */}
        </div>
    )
}
