import React from 'react';
import RadioGroup from '../RadioGroup/RadioGroup';
import Radio from '../Radio/Radio';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const MOUNTING_QUERY = gql`
	query {
		mounting:allMountings {
			id
			name
		}
	}
`;

const MountingRadio = ({defaultValue, onChange}) => {
	const { data = {}, error, loading } = useQuery(MOUNTING_QUERY);
	const { mounting = []} = data;
	if (loading) return <div />;		
	if (error) return <h6>Error</h6>;

	return (
		<RadioGroup label="Mounting" name="mounting" defaultValue={defaultValue}>
			{mounting.map(({ id, name }) => <Radio key={name + '_' + id} label={name} value={id} callback={onChange} />)}
		</RadioGroup>
	);
};

export default MountingRadio;
