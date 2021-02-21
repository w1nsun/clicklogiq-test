class DateConverter {
    static unixTimestampToYmd(unixTimestamp) {
        let dateFrom = new Date(unixTimestamp * 1000);

        let month = dateFrom.getMonth() + 1;
        month = month.toString().padStart(2, '0');
        const dayOfMonth = dateFrom.getDate().toString().padStart(2, '0');

        return `${dateFrom.getFullYear()}-${month}-${dayOfMonth}`;
    }
}

module.exports = DateConverter;