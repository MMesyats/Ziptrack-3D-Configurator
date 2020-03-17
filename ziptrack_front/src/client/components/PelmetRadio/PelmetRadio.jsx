import React from 'react';
import RadioGroup from '../RadioGroup/RadioGroup';
import Radio from '../Radio/Radio';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_PELMETS = gql`
  {
    pelmets: allPelmets {
      id
      name
    }
  }
`;


const PelmetRadio = ({onChange, defaultValue}) => {
	const {loading , error, data} = useQuery(GET_PELMETS);

	if(loading)	return <div />;
  if(error) return <h6>Error</h6>

 	return (
        <RadioGroup label="Pelmets" name="pelmets" defaultValue={defaultValue} >
            {data.pelmets.map(({id,name}) => <Radio key={name+'_'+id} label={name} value={id} callback={onChange}/>)}
        </RadioGroup>
    );
};

export default PelmetRadio;
