import React from 'react';
import RadioGroup from '../RadioGroup/RadioGroup';
import Radio from '../Radio/Radio';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const PRODUCT_TYPE_QUERY = gql`
	query {
		productTypes: allProductTypes {
			id
			name
		}
	}
`;

const ProductTypeRadio = ({ defaultValue, onChange }) => {
	const { data = {}, loading, error } = useQuery(PRODUCT_TYPE_QUERY);
	const { productTypes = [] } = data;
	
	if (loading) return <div />;
	if (error) return <div>Error</div>;

	return (
		<RadioGroup label="Product Type" name="productTypes" defaultValue={defaultValue}>
			{productTypes.map(({ id, name }) => (
				<Radio key={name + '_' + id} label={name} value={id} callback={onChange} />
			))}
		</RadioGroup>
	);
};

export default ProductTypeRadio;
