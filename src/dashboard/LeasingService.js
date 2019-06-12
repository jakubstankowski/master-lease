export default class leasingService {
    getLeasingData() {
        const carId = localStorage.getItem('leasingCarId');
        if (!carId) {
            return;
        }
        return {
            carId: carId,
        };

    }

}
