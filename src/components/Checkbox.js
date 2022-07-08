import React from 'react'
import {firebase} from '../firebase'

export const Checkbox = ({id}) => {
    const archivedTask = () => {
        firebase
        .firestore()
        .collection('tasks')
        .doc(id)
        .update({
            archived:true,
        })
    };

    return (
        <div className='checkbox-holder' data-testid='checkbox-action'
            onclick = {()=> archivedTask()}>
                <span className='checkbox'/>
            </div>
    )


}