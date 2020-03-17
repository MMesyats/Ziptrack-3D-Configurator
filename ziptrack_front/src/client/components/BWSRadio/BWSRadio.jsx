import React from 'react';
import RadioGroup from '../RadioGroup/RadioGroup';
import Radio from '../Radio/Radio';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_BWS = gql`
	{
		bws: allBWS {
			id
			value
		}
	}
`;

const BWSRadio = ({ defaultValue, onChange }) => {
	const { data, error, loading } = useQuery(GET_BWS);

	if (loading) return <div />;
	if (error) return <h6> Error </h6>;

	return (
		<RadioGroup label="Bottom Weather Strip" name="bws" defaultValue={defaultValue}>
			{data.bws.map(({ id, value }) => (
				<Radio key={value + '_' + id} label={value} value={id} callback={onChange} />
			))}
		</RadioGroup>
	);
};

export default BWSRadio;
