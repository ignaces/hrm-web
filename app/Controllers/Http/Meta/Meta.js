'use strict'

const data = use('App/Utils/Data')

class Meta {

    async intro ({view}) {

        return view.render('metas/metas');
    }
}

module.exports = Meta
