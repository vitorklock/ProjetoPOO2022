
var activeItem;
let items = new function Items() {

    function Item(element) {
        function clear(string) {
            return String(string).replace(/\s+/g, "").replace(/\n+/g, "");
        }

        let $e = $(element);
        this.id = clear($e.find('.id').html());
        this.dueDate = clear($e.find('.dueDate').html());
        this.way = clear($e.find('.way').html());
        this.description = clear($e.find('.description').html());
        this.value = clear($e.find('.value').html());
        this.paymentDate = clear($e.find('.paymentDate').html());
    }

    this.get = (element) => {
        let e = new Item(element);
        console.log(e)
        return e;
    }

    this.makeActive = (element) => {
        activeItem = $(element);
        let item = new Item(element);
        console.log(item)

        $('#id').val(item.id);
        $('#dueDate').val(item.dueDate);
        $('#way').val(item.way);
        $('#description').val(item.description);
        $('#value').val(item.value);
        $('#paymentDate').val(item.paymentDate);
    }

    this.save = async () => {
        let item = new Item(activeItem);

        let id = $('#id').val(),
            dueDate = $('#dueDate').val(),
            way = $('#way').val(),
            description = $('#description').val(),
            value = $('#value').val(),
            paymentDate = $('#paymentDate').val();

        if (!dueDate || !way || !description || !value) {
            alert('Preencha todos os campos!');
            return;
        }

        if (activeItem) {
            activeItem.find('.id').html(id);
            activeItem.find('.dueDate').html(dueDate);
            activeItem.find('.way').html(way);
            activeItem.find('.description').html(description);
            activeItem.find('.value').html(value);
            activeItem.find('.paymentDate').html(paymentDate);
        } else {
            id = Math.floor(Math.random() * 9999);

            $('table').append(`
            <tr onclick="items.makeActive(this)">
                <td class="id">${id}</td>
                <td class="dueDate">${dueDate}</td>
                <td class="way">${way}</td>
                <td class="description">${description}</td>
                <td class="value">${value}</td>
                <td class="paymentDate">${paymentDate}</td>
                <td>
                <button onclick="items.remove($(this).parent().parent())" class="btn remove">
                    Remover
                </button>
                </td>
            </tr>
        `);
        };

        item = new Item(activeItem);

        let newItem = {
            id: Number(item.id),
            description: item.description,
            dueDate: item.dueDate,
            paymentDate: item.paymentDate,
            value: parseInt(Number(item.value.replaceAll(",", "").replace(/[^0-9.]+/g, ''))),
            way: item.way == 'Saída' ? 'out' : 'in',
        }

        await new Promise(r => setTimeout(r, 200));

        console.log(newItem)

        await fetch(`${apiUrl}/transaction`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            mode: "cors",
            body: JSON.stringify(newItem)
        });

        clearDrawer();
        activeItem = null;
    }

    this.remove = async (element, event) => {
        // event.stopPropagation();

        await fetch(`${apiUrl}/transaction/${new Item(element).id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            mode: "cors",
        });

        $(element).remove();
    }
}

function clearDrawer() {
    $('#id').val(Math.floor(Math.random() * 9999));
    $('#dueDate').val('');
    $('#way').val('');
    $('#description').val('');
    $('#value').val('');
    $('#paymentDate').val('');
}

const apiUrl = "http://localhost:8080";
async function listInitial() {
    let reqTransactions = await fetch(`${apiUrl}/transaction`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        mode: "cors"
    });
    let transactions = await reqTransactions.json();

    console.log(transactions)

    $('table tr:not(:first)').remove();
    for (let transaction of transactions) {
        $('table').append(`
        <tr onclick="items.makeActive(this)">
                        <td class="id">
                            ${transaction.id}
                        </td>
                        <td class="dueDate">
                            ${transaction.dueDate || ""}
                        </td>
                        <td class="way">
                            ${!transaction.way ? "" : transaction.way == "out" ? "Pagar" : "Receber"}
                        </td>
                        <td class="description">
                            ${transaction.description || ""}
                        </td>
                        <td class="value">
                            ${transaction.value || ""}
                        </td>
                        <td class="paymentDate">
                            ${transaction.paymentDate || ""}
                        </td>
                        <td>
                            <button onclick="items.remove($(this).parent().parent())" class="btn remove">Remover</button>
                        </td>
                    </tr>
        `)
    }
}

$(document).ready(async () => {
    await listInitial();
})




