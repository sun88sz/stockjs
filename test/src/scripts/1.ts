function displayTotalPerCustomer(person: string, total: number) {
    let message: string = "Total for " + person + " xxx " + total;
    document.getElementById("totalMessage").innerText = message;

}