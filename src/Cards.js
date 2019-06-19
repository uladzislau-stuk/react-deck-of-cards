import React from 'react';
import uuid from 'uuid/v4'

const Cards = (props) => {
	return (
		<div className='Desc-card'>
			{props.shaffledCards.map(card => (
				<img
					key={uuid()}
					src={card.image}
					alt={card.code}
				/>
			))}
		</div>
	);
}

export default Cards;