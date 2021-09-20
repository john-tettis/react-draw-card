import React, {useState, useEffect, useRef} from 'react';
import Card from './Card'
import {Button} from 'reactstrap'
const axios = require('axios');



const Deck = ()=>{
    let[deck,setDeck] = useState(null)
    let [drawn, setDrawn]= useState([])
    let interval = useRef();

    async function loadDeck(){
        let res = await axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        setDeck(res.data)
    }
    useEffect(()=>{
        loadDeck();
    },[])
    const drawCard=async()=>{
        console.log(drawn)
        if(drawn.length===52){
            alert('There are no cards left!')
        }
        else{
            let response= await axios.get(`http://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`)
            let card =response.data.cards[0];
                card.rotation=Math.floor(Math.random()*40)-19;
            setDrawn(cards=>[...cards,card])
        }
    }
    const intervalCard=()=>{
        if(interval.current){
            clearInterval(interval.current)
            interval.current=null;
        }
        else{
            interval.current=setInterval(()=>{
                drawCard()
            },1000)
        }
    }
    const shuffle=()=>{
        loadDeck();
        setDrawn([])
        

}
    return (
        <div className='deck'>
            <Button className='m-2' color='success'onClick={drawCard}>Draw one Card</Button>
            <Button className='m-2' color='primary'onClick={intervalCard}>{interval.current? 'Stop Drawing':'Start Drawing'}</Button>
            <Button className='m-2' color='primary'onClick={shuffle}>Shuffle</Button>

            <div className='container-fluid'>
                {drawn.map(card=><Card key ={card.code}img={card.image} rotation={card.rotation}/>)}
            </div>

        </div>
    )
}


export default Deck