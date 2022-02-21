import React, {useState} from 'react'

export default function Todo() {

    const [inputText, setText] = useState('');
    const [createTask, setTask] = useState([]);

    const inputHandler = (event) =>{
        // console.log('Event Fired!!');
        setText(event.target.value);
        
    }

    const creatTaskHandler = (event) => {
        if(inputText.length != 0){
            setTask([...createTask, inputText]);
            setText('');
        }
    }

    const  dellTaskHandler = (id) => {
        // console.log(id);
        const remainingTask = createTask.filter((element, index) => {
            // console.log(index);
            // console.log(id);
            return index !== id;
        })
        setTask(remainingTask);
    }
    return (
        <div className="todoBox">
            <h2 className="todo--title">Todo App</h2>
            <div className="inputDiv">
                <label className="inputLabel" htmlFor="inputField">New Todo</label>
                <input className="inputDiv__filed" type="text" value={inputText} id="inputField" placeholder='Enter task to do' onChange={inputHandler}/>
                <button className="addBtn" onClick={creatTaskHandler}><span className="addbtn_span">&#43;</span></button>
            </div>
            <div className="taskList">
                <ul className="taskList__ul">
                    {
                        createTask.map((element, index) => {
                            return(
                                <li className="taskList__li" key={index}>{element} 
                                    <button className="dellBtn" onClick={() => dellTaskHandler(index) }>&#128465;</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <p className="remainingtask">There is {createTask.length} pending task</p>
        </div>
    )
}
