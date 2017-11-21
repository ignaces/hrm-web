'use strict'

class Guess {
    render ({ view,request, response }) {
        
        const guessedNumber = Number(request.input('number'))
        const randomNumber = Math.floor(Math.random() * 20) + 1

        return view.render('game', { guessedNumber, randomNumber })
    }
}

module.exports = Guess
