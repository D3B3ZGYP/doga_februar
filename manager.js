/**
 * @import {RowspanType, ColspanType} from "./functions.js"
 * 
 * @callback AddCallback
 * @param {RowspanType | ColspanType} row
 * @returns {void}
 */

class Manager{
    /**
     * @type {RowspanType[] | ColorspanType[]}
     */
    #dataArray
    /**
     * @type {AddCallback}
     */
    #addCallback

    /**
     * @param {AddCallback} callback
     */
    set addCallback(callback){
        this.#addCallback = callback
    }

    constructor(){
        this.#dataArray = []
    }

    /**
     * @param {RowspanType | ColspanType} row 
     * @returns {void}
     */
    addElement(row){
        this.#dataArray.push(row)

        if (this.#addCallback != null)
            this.#addCallback(row)
    }
}

export {Manager}