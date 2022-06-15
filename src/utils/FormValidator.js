

export default function formValidator(listOfForms) {
    let i = 0
    let haveError = false
    let listOfErrors = []

    /*
    [
        {
            "form": valueForm,
            "formName": "Nome"
            "messsage": ""
            "rule": (valueForm < 3)
        }
        
    ]
    
    */

    if (listOfForms[0].form == "success"){
        return {"id": i++, "message": `${listOfForms[0].message}`}

    } else if (listOfForms[0].form == "error"){
        return {"id": i++, "message": `${listOfForms[0].message}`}
        
    }

    listOfForms.forEach(element => {
        if (element == ""){
            listOfErrors.push({"id": i++, "message": `${element.formName}: Deve ser informado!}`})
        }

        if(element.rule){
            listOfErrors.push({"id": i++, "message": `${element.formName}: ${element.message}`})
        }
    });

    return {haveError, listOfErrors}
}