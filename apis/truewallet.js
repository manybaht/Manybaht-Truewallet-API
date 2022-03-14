const fetch = require('axios');
const tls = require("tls");

tls.DEFAULT_MIN_VERSION = "TLSv1.3";

module.exports = {
    redeemvouchers: async function (phone_number, voucher_code) {
        voucher_code = voucher_code.replace('https://gift.truemoney.com/campaign/?v=','');
        let res;
        if(!/^[a-z0-9]*$/i.test(voucher_code)) {
            res = {
                status: 'FAIL',
				reason: 'Vouncher only allow English alphabets or numbers.'
            };
            return res;
        }
        if(voucher_code.length <= 0) {
            res = {
                status: 'FAIL',
				reason: 'Vouncher code cannot be empty.'
            };
            return res;
        }
        const data = {
            mobile : `${phone_number}`,
            voucher_hash : `${voucher_code}`
        };
        const response = await fetch(`https://gift.truemoney.com/campaign/vouchers/${voucher_code}/redeem`, {
        method: 'post',
        data: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        })
        .catch((err) => {
            return err;
        });
        const resjson = response.data ? response.data : response.response.data;
        if(resjson.status.code == 'SUCCESS') {
            res = {
                status: 'SUCCESS',
                amount: parseInt(resjson.data.voucher.redeemed_amount_baht)
            };
            return res;
        } else {
            res = {
                status: 'FAIL',
				reason: resjson.status.message
            };
            return res;
        }
    }
};