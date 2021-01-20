const fetch = require('node-fetch');

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
        const body = {
            mobile : `${phone_number}`,
            voucher_hash : `${voucher_code}`
        };
        const response = await fetch(`https://gift.truemoney.com/campaign/vouchers/${voucher_code}/redeem`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
        });
        const resjson = await response.json();
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