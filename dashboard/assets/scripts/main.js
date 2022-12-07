
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
        return new Item(element);
    }

    this.makeActive = (element) => {
        activeItem = $(element);
        let item = new Item(element);

        $('#id').val(item.id);
        $('#dueDate').val(item.dueDate);
        $('#way').val(item.way);
        $('#description').val(item.description);
        $('#value').val(item.value);
        $('#paymentDate').val(item.paymentDate);
    }

    this.save = () => {
        let item = new Item(activeItem);

        if (activeItem) {
            item.id = $('#id').val();
            item.dueDate = $('#dueDate').val();
            item.way = $('#way').val();
            item.description = $('#description').val();
            item.value = $('#value').val();
            item.paymentDate = $('#paymentDate').val();

            activeItem.find('.id').html(item.dueDate);
            activeItem.find('.dueDate').html(item.dueDate);
            activeItem.find('.way').html(item.way);
            activeItem.find('.description').html(item.description);
            activeItem.find('.value').html(item.value);
            activeItem.find('.paymentDate').html(item.paymentDate);
        } else {
            let dueDate = $('#dueDate').val(),
                way = $('#way').val(),
                description = $('#description').val(),
                value = $('#value').val(),
                paymentDate = $('#paymentDate').val(),
                id = Math.floor(Math.random() * 99999999);


            if (!dueDate || !way || !description || !value) {
                alert('Preencha todos os campos!');
                return;
            }

            $('table').append(`
            <tr onclick="items.makeActive(this)">
                <td class="id">${id}</td>
                <td class="dueDate">${dueDate}</td>
                <td class="way">${way}</td>
                <td class="description">${description}</td>
                <td class="value">${value}</td>
                <td class="paymentDate">${paymentDate}</td>
            </tr>
        `);
        }

        clearDrawer();
        activeItem = null;
    }
}

function clearDrawer() {
    $('#dueDate').val('');
    $('#way').val('');
    $('#description').val('');
    $('#value').val('');
    $('#paymentDate').val('');
}

const apiUrl = "http://localhost:8008";
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
}




