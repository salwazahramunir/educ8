function formatDate(data) {
    const created = new Date(data);
    const year = created.getFullYear();
    let month = created.getMonth() + 1;
    let date = created.getDate();

    if(month < 10) {
        month = `0${month}`;
    }

    if(date < 10) {
        date = `0${date}`;
    }

    return `${year}-${month}-${date}`;
}

function formatRupiah(data){
    return 'Rp ' + new Intl.NumberFormat('id-ID', { maximumSignificantDigits: 3 }).format(data) + ',00'
}

module.exports = {
    formatDate,
    formatRupiah
}