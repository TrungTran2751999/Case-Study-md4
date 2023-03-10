class AppBase {

    static DOMAIN = location.origin;

    static API_LOCATION_REGION = "https://vapi.vnappmob.com/api/province";
    static API_CUSTOMER = this.DOMAIN + '/api/customers';
    static API_DEPOSIT = this.DOMAIN + '/api/deposits';
    static API_TRANSFER = this.DOMAIN + '/api/transfers';

    static API_PRODUCT = this.DOMAIN + '/api/products';

    static SERVER_CLOUDINARY = "https://res.cloudinary.com";
    static CLOUDINARY_NAME = "/toanphat";
    static CLOUDINARY_SCALE_120_100 = "c_limit,w_120,h_100,q_100";
    static CLOUDINARY_SCALE_280_200 = "c_limit,w_280,h_200,q_100";

    static CLOUDINARY_URL = this.SERVER_CLOUDINARY + this.CLOUDINARY_NAME + '/image/upload';

    static AlertMessageEn = class {
        static SUCCESS_CREATED = "Successful data generation !";
        static SUCCESS_UPDATED = "Data update successful !";
        static SUCCESS_DEPOSIT = "Deposit transaction successful !";
        static SUCCESS_WITHDRAW = "Withdrawal transaction successful !";
        static SUCCESS_TRANSFER = "Transfer transaction successful !";
        static SUCCESS_DEACTIVATE = "Deactivate the customer successfully !";

        static ERROR_400 = "The operation failed, please check the data again.";
        static ERROR_401 = "Unauthorized - Your access token has expired or is not valid.";
        static ERROR_403 = "Forbidden - You are not authorized to access this resource.";
        static ERROR_404 = "Not Found - The resource has been removed or does not exist";
        static ERROR_500 = "Internal Server Error - The server system is having problems or cannot be accessed.";

        static ERROR_CREATED = 'Adding new customer failed';

        static ERROR_LOADING_PROVINCE = "Loading list of provinces - cities failed !";
        static ERROR_LOADING_DISTRICT = "Loading list of district - ward failed !"
        static ERROR_LOADING_WARD = "Loading list of wards - communes - towns failed !";

        static ERROR_LOADING_PRODUCT = "Loading list of products failed !"
    }

    static AlertMessageVi = class {
        static SUCCESS_CREATED = "T???o d??? li???u th??nh c??ng !";
        static SUCCESS_UPDATED = "C???p nh???t d??? li???u th??nh c??ng !";
        static SUCCESS_DEPOSIT = "Giao d???ch g???i ti???n th??nh c??ng !";
        static SUCCESS_WITHDRAW = "Giao d???ch r??t ti???n th??nh c??ng !";
        static SUCCESS_TRANSFER = "Giao d???ch chuy???n kho???n th??nh c??ng !";
        static SUCCESS_DEACTIVATE = "H???y k??ch ho???t kh??ch h??ng th??nh c??ng !";

        static ERROR_400 = "Thao t??c kh??ng th??nh c??ng, vui l??ng ki???m tra l???i d??? li???u.";
        static ERROR_401 = "Unauthorized - Access Token c???a b???n h???t h???n ho???c kh??ng h???p l???.";
        static ERROR_403 = "Forbidden - B???n kh??ng ???????c quy???n truy c???p t??i nguy??n n??y.";
        static ERROR_404 = "Not Found - T??i nguy??n n??y ???? b??? x??a ho???c kh??ng t???n t???i";
        static ERROR_500 = "Internal Server Error - H??? th???ng Server ??ang c?? v???n ????? ho???c kh??ng truy c???p ???????c.";

        static ERROR_CREATED = 'Th??m kh??ch h??ng m???i kh??ng th??nh c??ng';

        static ERROR_LOADING_PROVINCE = "T???i danh s??ch t???nh - th??nh ph??? kh??ng th??nh c??ng !";
        static ERROR_LOADING_DISTRICT = "T???i danh s??ch qu???n - ph?????ng - huy???n kh??ng th??nh c??ng !";
        static ERROR_LOADING_WARD = "T???i danh s??ch ph?????ng - x?? - th??? tr???n kh??ng th??nh c??ng !";
    }

    static showSuspendedConfirmDialog() {
        return Swal.fire({
            icon: 'warning',
            text: 'Are you sure to suspend the selected customer ?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, please suspend this client !',
            cancelButtonText: 'Cancel',
        })
    }

    static showSuccessAlert(t) {
        Swal.fire({
            icon: 'success',
            title: t,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
        })
    }

    static showErrorAlert(t) {
        Swal.fire({
            icon: 'error',
            title: 'Warning',
            text: t,
        })
    }

    static formatNumber() {
        $(".num-space").number(true, 0, ',', ' ');
        $(".num-point").number(true, 0, ',', '.');
        $(".num-comma").number(true, 0, ',', ',');
    }

    static formatNumberSpace(x) {
        return x.toString().replace(/ /g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    static removeFormatNumberSpace(x) {
        return x.toString().replace(/ /g, "")
    }

    static formatTooltip() {
        $('[data-toggle="tooltip"]').tooltip();
    }


    static renderCustomer(customer, locationRegion) {
        return `
            <tr id="tr_${customer.id}">
            <td class="text-center">${customer.id}</td>
            <td>${customer.fullName}</td>
            <td>${customer.email}</td>
            <td class="text-center">${customer.phone}</td>
            <td>${locationRegion.provinceName}</td>
            <td>${locationRegion.districtName}</td>
            <td>${locationRegion.wardName}</td>
            <td>${locationRegion.address}</td>
            <td class="text-end num-space">${customer.balance}</td>
            <td class="text-center">
                <a class="btn btn-outline-secondary edit" title="Edit" data-toggle="tooltip" data-id="${customer.id}">
                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                </a>
            </td>
            <td class="text-center">
                <a class="btn btn-outline-success deposit" title="Deposit" data-toggle="tooltip" data-id="${customer.id}" >
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </a>
            </td>
            <td class="text-center">
                <a class="btn btn-outline-warning withdraw" title="Withdraw" data-toggle="tooltip" data-id="${customer.id}" >
                    <i class="fa fa-minus" aria-hidden="true"></i>
                </a>
            </td>
            <td class="text-center">
                <a class="btn btn-outline-primary transfer" title="Transfer" data-toggle="tooltip" data-id="${customer.id}" >
                    <i class="fa fa-exchange" aria-hidden="true"></i>
                </a>
            </td>
            <td class="text-center">
                <a class="btn btn-outline-danger suspended" title="Suspended" data-toggle="tooltip" data-id="${customer.id}" >
                    <i class="fa fa-ban" aria-hidden="true"></i>
                </a>
            </td>
        </tr>
        `;
    }


    static renderProduct(item) {
        return `
            <tr id="tr_${item.id}">
                <td>${item.id}</td>
                <td>
                    <img src="${AppBase.CLOUDINARY_URL + '/' + this.CLOUDINARY_SCALE_120_100 + '/' + item.fileFolder + '/' + item.fileName}" alt="" />
                </td>
                <td>${item.title}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.description}</td>
                <td class="text-center">
                    <a class="btn btn-outline-secondary edit" title="Edit" data-toggle="tooltip" data-id="${item.id}">
                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </a>
                </td>
                <td class="text-center">
                    <a class="btn btn-outline-danger delete" title="Delete" data-toggle="tooltip" data-id="${item.id}" >
                        <i class="fa fa-ban" aria-hidden="true"></i>
                    </a>
                </td>
            </tr>
        `;
    }

    static renderProductShopping(item) {
        return `
            <div class="card fl mgr-10" style="width: 288px; height: 356px">
                <div style="width: 280px; height: 200px">
                    <img src="${AppBase.CLOUDINARY_URL + '/' + this.CLOUDINARY_SCALE_280_200 + '/' + item.fileFolder + '/' + item.fileName}" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.price}</p>
                    <a href="#" class="btn btn-primary">Add to cart</a>
                </div>
            </div>
        `;
    }
}


class LocationRegion {
    constructor(id, provinceId, provinceName, districtId, districtName, wardId, wardName, address) {
        this.id = id;
        this.provinceId = provinceId;
        this.provinceName = provinceName;
        this.districtId = districtId;
        this.districtName = districtName;
        this.wardId = wardId;
        this.wardName = wardName;
        this.address = address;
    }
}

class Customer {
    constructor(id, fullName, email, phone, balance, locationRegion) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.balance = balance;
        this.locationRegion = locationRegion;
    }
}

class Sender extends Customer{
    constructor(id, fullName, email, phone, address, balance) {
        super();
    }
}

class Recipient extends Customer{
    constructor(id, fullName, email, phone, address, balance) {
        super();
    }
}

class Deposit {
    constructor(customerId, fullName, balance, transactionAmount) {
        this.customerId = customerId;
        this.fullName = fullName;
        this.balance = balance;
        this.transactionAmount = transactionAmount;
    }
}

class Withdraw {
    constructor(customerId, fullName, balance, transactionAmount) {
        this.customerId = customerId;
        this.fullName = fullName;
        this.balance = balance;
        this.transactionAmount = transactionAmount;
    }
}

class Transfer {
    constructor(senderId, senderName, email, recipientId, recipientName, balance, transferAmount, fees, feesAmount, transactionAmount) {
        this.senderId = senderId;
        this.senderName = senderName;
        this.email = email;
        this.recipientId = recipientId;
        this.recipientName = recipientName;
        this.balance = balance;
        this.transferAmount = transferAmount;
        this.fees = fees;
        this.feesAmount = feesAmount;
        this.transactionAmount = transactionAmount;
    }
}