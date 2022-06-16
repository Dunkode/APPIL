

export default function formValidator(listOfForms) {
    let i = 0
    let haveError = false
    let listOfErrors = []

    /*
    [
        {
            "formName": "Nome"
            "messsage": ""
            "rule": (valueForm < 3)
        }
        
    ]    
    */

    listOfForms.forEach(element => {
        if (element.form == "" || element.form == undefined){
            listOfErrors.push({"id": i++, "message": `${element.formName}: Deve ser informado!`})
        }

        if(element.rule){
            listOfErrors.push({"id": i++, "message": `${element.formName}: ${element.message}`})
        }
    });

    if (listOfErrors.length > 0){
        haveError = true
    }

    return {haveError, listOfErrors}
}