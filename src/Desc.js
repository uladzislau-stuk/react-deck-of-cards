import React, {Component} from 'react'
import Cards from './Cards'
import axios from 'axios'

const BASE_URI = 'https://deckofcardsapi.com/api/deck/';
const DESK_URI = `${BASE_URI}new/shuffle/`

class Desc extends Component {
	constructor() {
		super()
		this.state = {
			deck_id: null,
			cards: []
		}

		this.getCard = this.getCard.bind(this)
	}
	async componentDidMount() {
		try {
			let res = await axios(DESK_URI)

			try {
				if (!res.data.success) throw new Error('Request with \'no success')
				this.setState({ deck_id: res.data.deck_id })
			} catch (e) {
				console.error(e.message)
			}
		} catch (e) {
			console.error('API is unavailable')
		}
	}
	async getCard() {
		try {
			let id = this.state.deck_id;
			let uri = `${BASE_URI}${id}/draw/`
			let res = await axios(uri)

			try {
				if (!res.data.success) throw new Error('Cards are unavailable')
				this.setState(st => ({ cards: [...st.cards, ...res.data.cards] }))
			} catch (e) {
				console.error(e.message)
			}
		} catch (e) {
			console.log('Can\'t get card')
		}
	}
	render() {
		return (
			<div className='Desc'>
				<Cards shaffledCards={this.state.cards}/>
				<button onClick={this.getCard}>Draw card</button>
			</div>
		);
	}
}

export default Desc