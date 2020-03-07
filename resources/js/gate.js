export default class Gate{

    constructor(user){
        this.user = user;
    }

    isSuperAdmin(){
        return this.user.type === 'superadmin';
    }
    isAdmin(){
        return this.user.type === 'admin';
    }
    isCustomer(){
        return this.user.type === 'customer';
    }
    isWorker(){
        return this.user.type === 'worker';
    }
    isCompany(){
        return this.user.type === 'company';
    }


}
