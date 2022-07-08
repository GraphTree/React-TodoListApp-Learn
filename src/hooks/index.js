import { useState, useEffect, useInsertionEffect} from 'react';
import {firebase} from '../firebase';
import {collatedTasksExist} from '../helpers';
import dayjs from 'dayjs';


export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);
    const [archivedTasks, setArchivedTasks] = useState([]);

    useEffect(() => {
        let unsubscribe = firebase
            .firestore() 
            .collection('tasks')
            .where('userId', '==', 'herick')

        unsubscribe = 
            selectedProject && !collatedTasksExist(selectedProject) ? 
                (unsubscribe = unsubscribe.where('projectId', '==', selectedProject)) 
            : selectedProject === 'TODAY'
                ? (unsubscribe = unsubscribe.where('date', '==', dayjs().format('DD/MM/YYYY'))) 
            : selectedProject === 'INBOX'|| selectedProject === 0
                ? (unsubscribe = unsubscribe.where('date', '==', ''))
                : unsubscribe;

        unsubscribe = unsubscribe.onSnapshot(snapshot => {
            const newTasks = snapshot.docs.map(task => ({
                id: task.id,
                ...task.data()
            }))
            setTasks(
                selectedProject === 'NEXT_7'
                ? newTasks.filter(task => dayjs(task.date).isAfter(dayjs().subtract(7, 'day')))
                : newTasks.filter(task => task.archived !== true)
                );
        
            setArchivedTasks(newTasks.filter(task => task.archived === true));
        })
        
        return () => unsubscribe()
    }, [selectedProject]);


    return {tasks, archivedTasks}
}

export const userProjects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(()=> {
        firebase
            .firestore()
            .collection('projects')
            .where('userId', '==', 'herick')
    }, []);
}