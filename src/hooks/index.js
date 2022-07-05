import { useState, useEffect} from 'react';
import {firebase} from '../firebase';
import {collatedTasksExist} from '../helpers';
import dayjs from 'dayjs';


export const useTasks = selectedProject => {
    const [tasks, setTasks] = useState([]);

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
    }, []);



}