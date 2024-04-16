let response = {
    "success": true,
    "message": "all user are",
    "data": [
        {
            "fileName": "policy1",
            "category": 'RE',
            "updatedBy": "rithvik",
            "updatedAt": "2024-01-22T00:29:54.119Z"
        },
        {
            "fileName": "policy2",
            "category": 'IT',
            "updatedBy": "dev",
            "updatedAt": "2023-04-29T00:29:54.119Z"
        },
        {
            "fileName": "policy3",
            "category": 'ABC',
            "updatedBy": "archit",
            "updatedAt": "2024-07-25T00:29:54.119Z"
        },
        {
            "fileName": "policy4",
            "category": 'CBR',
            "updatedBy": "tapasvi",
            "updatedAt": "2014-02-20T00:29:54.119Z"
        },
        {
            "fileName": "policy5",
            "category": 'hr',
            "updatedBy": "yash",
            "updatedAt": "2022-04-06T00:29:54.119Z"
        },
        {
            "fileName": "policy5",
            "category": 'hr',
            "updatedBy": "siraj",
            "updatedAt": "2018-03-01T00:29:54.119Z"
        },
        {
            "fileName": "policy5",
            "category": 'hr',
            "updatedBy": "sahil",
            "updatedAt": "2013-04-10T00:29:54.119Z"
        }

    ]
};


const tbody = document.getElementById('tbody');

const data = response.data;

for (let i = 0; i < data.length; i++) {

    let date = new Date(data[i].updatedAt);

    tbody.innerHTML += `            <tr class="bg-white">
        <th
          scope="row"
          class="whitespace-nowrap px-6 py-4 font-medium text-gray-900"
        >
          <a href="#">${data[i].fileName}</a>
        </th>
        <td class="px-6 py-4">${data[i].category}</td>
        <td class="px-6 py-4">${data[i].updatedBy}</td>
        <td class="px-6 py-4">${date.toLocaleDateString('en-GB')}</td>
      </tr>`;
}


function getdate(dateString) {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-based
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);

    return date;
}

function sort(col, order) {


    // const table = document.getElementById('myTable');
    const tbody = document.getElementById('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    const th = document.getElementsByTagName('th');
    if (order) {


        const a = th[col + 1].getElementsByTagName('a');
        a[0].setAttribute('onclick', `sort(${col}, ${!order})`);
        // .setAttribute('onclick', !order);
        if (col === 2) {

            rows.sort((rowA, rowB) => {
                let cellA = rowA.querySelectorAll('td')[col].textContent.trim();
                let cellB = rowB.querySelectorAll('td')[col].textContent.trim();
                cellA = getdate(cellA);
                cellB = getdate(cellB);
                return cellA - cellB;
            });

        } else {

            rows.sort((rowA, rowB) => {
                const cellA = rowA.querySelectorAll('td')[col].textContent.trim();
                const cellB = rowB.querySelectorAll('td')[col].textContent.trim();
                return cellA.localeCompare(cellB, 'en', { numeric: true });
            });
        }

    } else {

        const a = th[col + 1].getElementsByTagName('a');
        a[0].setAttribute('onclick', `sort(${col}, ${!order})`);

        if (col === 2) {

            rows.sort((rowA, rowB) => {
                let cellA = rowA.querySelectorAll('td')[col].textContent.trim();
                let cellB = rowB.querySelectorAll('td')[col].textContent.trim();
                cellA = getdate(cellA);
                cellB = getdate(cellB);
                return cellB - cellA;
            });

        } else {

            rows.sort((rowA, rowB) => {
                const cellA = rowA.querySelectorAll('td')[col].textContent.trim();
                const cellB = rowB.querySelectorAll('td')[col].textContent.trim();
                return cellB.localeCompare(cellA, 'en', { numeric: true });
            });
        }

    }




    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    rows.forEach(row => {
        tbody.appendChild(row);
    });
}
