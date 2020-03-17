import React, {useState,useEffect} from 'react';
import Radio from '../Radio/Radio';
import RadioGroup from '../RadioGroup/RadioGroup';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const MECHANIC_QUERY = gql`
    query {
        mechanics: allMechanics {
            id
            name 
            options { 
                id
                name
            }
        }
    }
`

const MechanicRadio = ({changeMechanicProp,changeOptionProp,defaultMechanic,defaultOption}) => {
    const { data = {}, error, loading } = useQuery(MECHANIC_QUERY);
    const { mechanics = [] } = data;
    const [ currentMechanic, changeMechanic ] = useState(defaultMechanic);
    const [ currentOption, changeOption] = useState(defaultOption); 
    const [ visibleOptions, changeVisibleOptions ] = useState([]);

    useEffect(()=>
    {
        if(mechanics.length > 0)
        {
            const mechanic = mechanics.find((el = {})=>(el.id === currentMechanic)? true :false)
            if (typeof mechanic !== undefined)
            {
                const {options = []} = mechanic;
                changeVisibleOptions(options);
                if(options.length>0 && options[0].hasOwnProperty('id'))
                {
                    changeOption(options[0].id);
                }
            }
            changeMechanicProp(currentMechanic);
        }
    }
    ,[currentMechanic,mechanics,changeMechanicProp]);

    useEffect(() => {
        changeOptionProp(currentOption);
    }, [currentOption,changeOptionProp])

    if (loading) return <div />;
	if (error) return <h6> Error </h6>;

   

	return (
        <>
            <RadioGroup name="mechanics" label="Mechanics" defaultValue={currentMechanic} >
			    {mechanics.map(({id,name}) => <Radio key={`${id}_${name}`} label={name} value={id} callback={changeMechanic}/>)}
		    </RadioGroup>
            { visibleOptions.length > 0 && 
            <RadioGroup name="mechanics-options" label="" defaultValue={currentOption} >
			    {visibleOptions.map(({id,name}) => <Radio key={`${id}_${name}`} label={name} value={id} callback={changeOption} />)}
		    </RadioGroup>
            }
        </>
    );
};

export default MechanicRadio;
