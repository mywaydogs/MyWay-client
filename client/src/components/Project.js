import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import FullCalendar, { flexibleCompare } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import heLocale from '@fullcalendar/core/locales/he';
import Collapsible from 'react-collapsible';
import { useParams } from 'react-router-dom';

function Project(props) {
    const projectReducer = (state, { type, data }) => {
        switch (type) {
            case 'INIT_PROJECT':
                return { ...data, goals: data.goals.map(goal => ({ ...goal, showOnCalendar: false })) };
            case 'SHOW_ON_CALENDAR':
                let goalIndex = state.goals.findIndex(goal => goal === data);
                return {
                    ...state,
                    goals: [
                        ...state.goals.slice(0, goalIndex),
                        { ...data, showOnCalendar: !data.showOnCalendar },
                        ...state.goals.slice(goalIndex + 1)
                    ]
                }
            case 'CHOOSE_GOAL':
                return { ...state, chosenGoal: data };
            case 'DOG_DIAGNOSIS_ON_CHANGE':
                return { ...state, dog: { ...state.dog, [data.name]: data.value } }
            default:
                return state;
        }
    }
    const [project, dispatch] = useReducer(projectReducer, null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`/api/projects/${id}`)
            .then(res => { dispatch({ type: 'INIT_PROJECT', data: res.data }) });
    }, [id]);

    const handleProjectUpdate = e => {
        // axios.put(`/api/projects/${id}`, project);
    }

    const handleDogDiagnosisChange = e => {
        dispatch({ type: 'DOG_DIAGNOSIS_ON_CHANGE', data: { name: e.target.name, value: e.target.value } })
    }

    if (!project) {
        return (<p>Loading...</p>);
    }
    return (
        <>
            <div>
                <h1>{project.name}</h1>
                <Collapsible trigger={<h2>פרטי לקוח - {project.customer.firstName} {project.customer.lastName}</h2>} >
                    <div>
                        <label>שם פרטי:</label>
                        {project.customer.firstName}
                    </div>
                    <div>
                        <label>שם משפחה:</label>
                        {project.customer.lastName}
                    </div>
                    <div>
                        <label>מייל:</label>
                        {project.customer.email}
                    </div>
                    <div>
                        <label>טלפון:</label>
                        {project.customer.phone}
                    </div>
                    <div>
                        <label>כתובת:</label>
                        {project.customer.address}
                    </div>
                </Collapsible>
            </div>
            <div>
                <Collapsible trigger={<h2>אבחון ראשוני</h2>} >
                    <div>
                        <h3>אבחון הכלב</h3>
                        <textarea name="diagnosis" value={project.dog.diagnosis} onChange={handleDogDiagnosisChange}></textarea>
                    </div>
                    <div>
                        <h3>בחירת עזרים</h3>
                        <textarea name="accessories" value={project.dog.accessories} onChange={handleDogDiagnosisChange}></textarea>
                    </div>
                    <div>
                        <h3>ניהול סביבתי</h3>
                        <textarea name="environmentalManagement" value={project.dog.environmentalManagement} onChange={handleDogDiagnosisChange}></textarea>
                    </div>
                    <div>
                        <h3>סיכום</h3>
                        <textarea name="summary" value={project.dog.summary} onChange={handleDogDiagnosisChange}></textarea>
                    </div>
                    <input type="button" value="שמור" onClick={handleProjectUpdate} />
                </Collapsible>
            </div>
            <Collapsible trigger={<h2>תכנית עבודה</h2>} open={true}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ width: '40vw' }}>
                        <FullCalendar
                            plugins={[dayGridPlugin, listPlugin]}
                            headerToolbar={{ center: 'dayGridMonth,listWeek' }}
                            initialView="dayGridMonth"
                            locale={heLocale}
                            defaultAllDay={true}
                            handleWindowResize={true}
                            events={project.goals.filter(goal => goal.showOnCalendar).map(goal => ({ title: goal.title, start: goal.startTime, end: goal.endTime }))}
                        />
                    </div>
                    <div>
                        <h2>מטרות</h2>
            מיין לפי:
            <select>
                            <option value="">זמן סיום</option>
                            <option value="">בלהבלה</option>
                            <option value="">ממלא מקום</option>
                        </select>
                        <ul style={{ listStyleType: 'none' }}>
                            {project.goals.map((goal, idx) => (
                                <li
                                    key={`${idx}`}
                                    style={{ 'margin': '10px auto', border: '1px solid black' }}
                                    onMouseDownCapture={e => {
                                        dispatch({ type: 'CHOOSE_GOAL', data: goal })
                                    }}
                                >
                                    <input type="checkbox" checked={goal.showOnCalendar} onChange={() => dispatch({ type: 'SHOW_ON_CALENDAR', data: goal })} />
                                    <label>{goal.title}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    {project.chosenGoal && (<>
                        <h2>פירוט מטרה - {project.chosenGoal.title}</h2>
                        <h3>תיאור המטרה</h3>
                        <p>{project.chosenGoal.description}</p>
                        <h3>משימות</h3>
                        <ul>
                            {project.chosenGoal.tasks.map((task, idx) => (
                                <li key={idx}>{task.title}</li>
                            ))}
                        </ul>
                    </>
                    )}
                </div>
            </Collapsible>
        </>);
}

export default Project;