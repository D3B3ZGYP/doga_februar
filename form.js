/**
 * @import {FormFieldType, ColspanType, RowspanType} from "./functions.js"
 */

import { createForm, createInputField } from "./functions.js"
import { Manager } from "./manager.js"

class FormController{
    /**
     * @type {Manager}
     */
    #manager
    /**
     * @type {FormField[]}
     */
    #formFieldElemList
    /**
     * @type {HTMLFormElement}
     */
    #form

    /**
     * 
     * @param {Manager} manager 
     * @param {FormFieldType[]} formFieldList 
     */
    constructor(manager, formFieldList){
        this.#manager = manager
        this.#formFieldElemList = []

        createForm((form) => {
            document.body.appendChild(form)
            for (const i of formFieldList)
                this.#formFieldElemList.push(new FormField(i.id, i.name, i.label, i.required, form))
        }, (e) => {
            e.preventDefault()

            const elem = this.#createElement()
            if (elem){
                this.#manager.addElement(elem)
                e.target.reset()
            }
        })
    }

    /**
     * 
     * @returns {ColspanType | RowspanType | null}
     */
    #createElement(){
        let result = {}
        let validate = true

        for (const i of this.#formFieldElemList)
            if (i.validate())
                result[i.name] = i.value
            else
                validate = false

        if (validate)
            return result
        else
            return null
    }
}

class FormField{
    /**
     * @type {string}
     */
    #name
    /**
     * @type {boolean}
     */
    #required
    /**
     * @type {HTMLDivElement}
     */
    #errorDiv
    /**
     * @type {HTMLInputElement}
     */
    #input

    get name(){
        return this.#name
    }

    get value(){
        return this.#input.value ? this.#input.value : undefined
    }

    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} labelContent 
     * @param {boolean} required 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, name, labelContent, required, parent){
        const {errorElement, input} = createInputField({id, name, labelContent, parent})
        this.#errorDiv = errorElement
        this.#name = name
        this.#input = input
        this.#required = required
    }

    /**
     * 
     * @returns {boolean}
     */
    validate(){
        let result = true

        if (this.#required && !this.value){
            result = false
            this.#errorDiv.innerText = "Kötelező"
        } else {
            this.#errorDiv.innerText = ""
        }

        return result
    }
}

export {FormController}