import React from 'react';
import RadioGroup from '../RadioGroup/RadioGroup';
import Radio from '../Radio/Radio';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_MATERIALS = gql`
	{
		materials: allMaterials {
			id
			name
		}
	}
`;

const MaterialRadio = ({onChange, defaultValue}) => {
	const { data, error, loading } = useQuery(GET_MATERIALS);

	if (loading) return <div />;
	if (error) return <h6> Error </h6>;

	return (
		<RadioGroup label="Materials" name="materials" defaultValue={defaultValue}>
			{data.materials.map(({ id, name }) => <Radio key={name + '_' + id} label={name} value={id} callback={onChange}/>)}
		</RadioGroup>
	);
};

export default MaterialRadio;
