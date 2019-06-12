export default class authService {

    saveAuthData(authToken, expiresIn, userId) {
        localStorage.setItem('token', authToken);
        localStorage.setItem('expiresIn', expiresIn);
        localStorage.setItem('userId', userId);
    }

    clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiresIn');
        localStorage.removeItem('leasingInstalmentPrice');
        localStorage.removeItem('leasingCard');
        localStorage.removeItem('leasingTime');
        localStorage.removeItem('leasingCarId');
        localStorage.removeItem('leasingEntryFee');
        localStorage.removeItem('userId');
    }

    getAuthData() {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        return {
            token: token,
        };

    }

}
