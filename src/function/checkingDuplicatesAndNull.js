const checkingDuplicatesAndNull = (name, array) => {
    if (name.trim() === "") {
        alert("Введите название");
        return false;
    }
    const isNameExists = array.some((array) => array.name.toLowerCase().trim() === name.toLowerCase().trim());
    if (isNameExists) {
        alert("Уже есть такое название");
        return false;
    }
    return true;
}

export default checkingDuplicatesAndNull;