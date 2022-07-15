module.exports = {
    generateDatesForBooking () {
        let today = new Date();
        let startDate = new Date(today.setDate(today.getDate() + 3)).toISOString().split('T')[0];
        let endDate = new Date(today.setDate(today.getDate() + 8)).toISOString().split('T')[0];
        return [startDate, endDate];
     }
}