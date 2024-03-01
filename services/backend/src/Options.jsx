import React from 'react'

const Options = ({practitioner}) => {
    try{
        return (
            <option value={(practitioner.id).toString()} pract_id = {practitioner.id}>{practitioner.name}</option>
        )
    }
    catch(error){
        console.log(error)
    }
    
}

export default Options