const mahasiswaData = [
    { nim: "202412023", nama: "Kintaro", alamat: "Loktuan", tgl: "2005-05-12", gender: "Pria", password: "password123" },
    { nim: "202412024", nama: "Ada Wong", alamat: "Resident Evil St.", tgl: "2004-10-04", gender: "Wanita", password: "assignment_complete" },
    { nim: "202412025", nama: "Leon S.K", alamat: "Raccoon City", tgl: "2004-02-18", gender: "Pria", password: "zombie_hunter" },
    { nim: "202412026", nama: "Claire R.", alamat: "Redfield Ave", tgl: "2005-11-20", gender: "Wanita", password: "brother_search" },
    { nim: "202412027", nama: "Albert W.", alamat: "Umbrella Corp", tgl: "2003-01-01", gender: "Pria", password: "global_saturation" },
    { nim: "202412028", nama: "Jill V.", alamat: "S.T.A.R.S HQ", tgl: "2004-06-15", gender: "Wanita", password: "lockpick_master" },
];

let currentPage = 1;
const rowsPerPage = 5;

// 2. Fungsi Render Tabel
function renderTable(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = "";

    // Logika Pagination Slicing
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedData = data.slice(start, end);

    paginatedData.forEach((mhs, index) => {
        const row = `
            <tr>
                <td>${start + index + 1}</td>
                <td>${mhs.nim}</td>
                <td>${mhs.nama}</td>
                <td>${mhs.alamat}</td>
                <td>${mhs.tgl}</td>
                <td><span class="badge">${mhs.gender}</span></td>
                <td>${mhs.password}</td>
                <td class="action-btns">
                    <button class="edit-btn">✎</button>
                    <button class="delete-btn">🗑</button>
                </td>
            </tr>`;
        tableBody.innerHTML += row;
    });

    updatePagination(data.length);
}

// 3. Fungsi Update Pagination Otomatis
function updatePagination(totalData) {
    const totalPages = Math.ceil(totalData / rowsPerPage);
    const container = document.getElementById('pagination-numbers');
    const info = document.getElementById('pagination-info');

    info.innerText = `SHOWING PAGE ${currentPage} OF ${totalPages}`;
    container.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.className = `page-num ${i === currentPage ? 'active' : ''}`;
        btn.onclick = () => {
            currentPage = i;
            renderTable(mahasiswaData);
        };
        container.appendChild(btn);
    }
}

// 4. Logika Pencarian (Search)
document.getElementById('data-search').addEventListener('input', function(e) {
    const keyword = e.target.value.toLowerCase();
    const filteredData = mahasiswaData.filter(mhs => 
        mhs.nama.toLowerCase().includes(keyword) || 
        mhs.nim.includes(keyword)
    );
    currentPage = 1; // Reset ke hal 1 saat mencari
    renderTable(filteredData);
});

// 5. Logika Export Simple (CSV)
function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,No,NIM,Nama,Alamat,Tanggal,Gender\n";
    mahasiswaData.forEach((mhs, i) => {
        csvContent += `${i+1},${mhs.nim},${mhs.nama},${mhs.alamat},${mhs.tgl},${mhs.gender}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data_mahasiswa.csv");
    document.body.appendChild(link);
    link.click();
}

// Inisialisasi Pertama Kali
renderTable(mahasiswaData);